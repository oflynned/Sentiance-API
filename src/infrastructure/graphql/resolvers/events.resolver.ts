import { Event } from '../../../models/event.model';
import { BadRequestError, ResourceNotFoundError } from '../../errors';
import { TimeUtils } from '../../../common/time-utils';
import { UnprocessableEntityError } from '../../errors/unprocessable-entity.error';

export const eventsQueryResolvers = {
  getEventByUid: async (
    context: object,
    args: { uid: string }
  ): Promise<object> => {
    const event = await Event.findById(args.uid);
    if (event) {
      return event.toJson();
    }

    throw new ResourceNotFoundError();
  },
  getEvents: async (
    context: object,
    args: { page: number }
  ): Promise<object[]> => {
    if (args.page < 0) {
      throw new BadRequestError('Page cannot be less than 0');
    }

    const limit = 10;
    const offset = args.page * limit;
    const events = await Event.findWithPagination(limit, offset);
    return events.map((event: Event) => event.toJson());
  },
  getEventsOnDate: async (
    context: object,
    args: { date: string }
  ): Promise<object[]> => {
    if (!TimeUtils.isInDateStringForm(args.date)) {
      throw new BadRequestError(
        'Date should be passed in the format yyyy-mm-dd'
      );
    }

    try {
      const { startDate, endDate } = TimeUtils.buildTimestampLimits(args.date);

      const events: Event[] = await Event.findBetweenTimestamps(
        startDate,
        endDate
      );

      return events.map((event: Event) => event.toJson());
    } catch (e) {
      throw new UnprocessableEntityError('Date is not valid');
    }
  }
};
