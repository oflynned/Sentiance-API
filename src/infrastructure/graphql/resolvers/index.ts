import { Repository } from 'mongoize-orm';
import { EventHistory } from '../../../models/event-history.model';
import { BadRequestError, ResourceNotFoundError } from '../../errors';

export const resolvers = {
  Query: {
    healthCheck: async (): Promise<object> => {
      return {
        ping: 'pong'
      };
    },
    getEventByUid: async (
      context: object,
      args: { uid: string }
    ): Promise<object> => {
      const event = await Repository.with(EventHistory).findById(args.uid);
      if (event) {
        return event.toJson();
      }

      throw new ResourceNotFoundError();
    }
  }
};
