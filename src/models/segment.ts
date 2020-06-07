import { BaseDocument, BaseModelType, Joi, Schema } from 'mongoize-orm';

export interface SegmentType extends BaseModelType {
  segment_definition_id: string;
  segment_definition: {
    id: string;
    display_name: string;
    description: string;
  };
}

export class SegmentSchema extends Schema<SegmentType> {
  joiBaseSchema(): object {
    return {
      segment_definition_id: Joi.string().required(),
      segment_definition: Joi.object({
        id: Joi.string().required(),
        display_name: Joi.string().required(),
        description: Joi.string().required()
      }).required()
    };
  }

  joiUpdateSchema(): object {
    return undefined;
  }
}

export class Segment extends BaseDocument<SegmentType, SegmentSchema> {
  joiSchema(): SegmentSchema {
    return new SegmentSchema();
  }
}
