import {
  BaseDocument,
  BaseModelType,
  Joi,
  Repository,
  Schema
} from 'mongoize-orm';
import { Analysis } from './moment.model';

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
  significance: string;
};

export interface EventType extends BaseModelType {
  type: string;
  start: Date;
  end: Date;
  analysis_type: Analysis;
  latitude?: number;
  longitude?: number;
  location?: LocationType;
  mode?: string;
  waypoints?: WaypointType[];
  trajectory?: TrajectoryType;
}

export class EventSchema extends Schema<EventType> {
  joiBaseSchema(): object {
    return {
      type: Joi.string().required(),
      start: Joi.date().required(),
      end: Joi.date().required(),
      analysis_type: Joi.string().required(),
      latitude: Joi.number(),
      longitude: Joi.number(),
      location: Joi.object({
        significance: Joi.string()
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

export class Event extends BaseDocument<EventType, EventSchema> {
  static async findBetweenTimestamps(
    startDate: Date,
    endDate: Date
  ): Promise<Event[]> {
    return Repository.with(Event).findMany(
      {
        start: { $gte: startDate, $lt: endDate }
      },
      { orderBy: { start: 1 } }
    );
  }

  static async findWithPagination(
    limit: number,
    offset: number
  ): Promise<Event[]> {
    return Repository.with(Event).findMany({}, { limit, offset });
  }

  static async findById(uid: string): Promise<Event | undefined> {
    return Repository.with(Event).findById(uid);
  }

  joiSchema(): EventSchema {
    return new EventSchema();
  }
}
