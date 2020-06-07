import { BaseDocument, BaseModelType, Joi, Schema } from 'mongoize-orm';

export type Analysis = 'processed';

export type MomentDefinition =
  | 'home'
  | 'nearby_home'
  | 'nearby_work'
  | 'evening'
  | 'afternoon'
  | 'sport_routine'
  | 'morning'
  | 'night_out'
  | 'night'
  | 'working_at_work'
  | 'commute_from_home'
  | 'evening_drinks'
  | 'city_name'
  | 'country'
  | 'shopping_routine'
  | 'lunch'
  | 'breakfast_out'
  | 'afternoon_drinks'
  | 'lunch_out'
  | 'evening_entertainment'
  | 'holiday'
  | 'commute_from_work'
  | 'dinner_out';

export interface MomentType extends BaseModelType {
  start: Date;
  end: Date;
  analysis_type: Analysis;
  moment_definition_id: MomentDefinition;
}

export class MomentSchema extends Schema<MomentType> {
  joiBaseSchema(): object {
    return {
      start: Joi.date().required(),
      end: Joi.date().required(),
      analysis_type: Joi.string().required()
    };
  }

  joiUpdateSchema(): object {
    return undefined;
  }
}

export class Moment extends BaseDocument<MomentType, MomentSchema> {
  joiSchema(): MomentSchema {
    return new MomentSchema();
  }
}
