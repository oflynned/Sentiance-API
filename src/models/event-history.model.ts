import { BaseDocument, BaseModelType, Joi, Schema } from 'mongoize-orm';
import { Analysis } from './moment-history.model';

export type WaypointType = {
  type: string;
  longitude: number;
  latitude: number;
  timestamp: Date;
  accuracy: number;
};

export type TrajectoryType = {
  type: string;
  encoded: string;
};

export type LocationType = {
  type: string;
  encoded: string;
};

export interface EventHistoryType extends BaseModelType {
  type: string;
  start: Date;
  end: Date;
  analysis_type: Analysis;
  latitude?: number;
  longitude?: number;
  location?: {
    significance: string;
  };
  mode?: string;
  waypoints?: WaypointType[];
  trajectory?: TrajectoryType;
}

export class EventHistorySchema extends Schema<EventHistoryType> {
  joiBaseSchema(): object {
    return {
      type: Joi.string().required(),
      start: Joi.date().required(),
      end: Joi.date().required(),
      analysis_type: Joi.string().required(),

      latitude: Joi.number(),
      longitude: Joi.number(),
      location: Joi.object({
        significance: Joi.string().required()
      }),
      mode: Joi.string(),
      waypoints: Joi.array().items(
        Joi.object({
          type: Joi.string(),
          longitude: Joi.number(),
          latitude: Joi.number(),
          timestamp: Joi.date(),
          accuracy: Joi.number()
        })
      )
    };
  }

  joiUpdateSchema(): object {
    return undefined;
  }
}

export class EventHistory extends BaseDocument<
  EventHistoryType,
  EventHistorySchema
> {
  collection(): string {
    return 'event_history';
  }

  joiSchema(): EventHistorySchema {
    return new EventHistorySchema();
  }
}
