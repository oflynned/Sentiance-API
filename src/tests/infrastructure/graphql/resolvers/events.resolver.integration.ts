import { bindGlobalDatabaseClient, InMemoryClient } from 'mongoize-orm';
import { EventFactory } from '../../../factories/event.factory';
import { Event } from '../../../../models/event.model';
import { eventsQueryResolvers } from '../../../../infrastructure/graphql/resolvers/events.resolver';
import {
  BadRequestError,
  ResourceNotFoundError
} from '../../../../infrastructure/errors';

const buildArrayPrefill = (max = 15) => {
  return Array(max).fill(0);
};

describe('Event model', () => {
  const client: InMemoryClient = new InMemoryClient();
  const factory: EventFactory = EventFactory.getInstance();
  let events: Event[];

  beforeAll(async () => {
    await bindGlobalDatabaseClient(client);

    const fixtures = buildArrayPrefill().map(
      (value: number, index: number): Promise<Event> => {
        const date = index + 1 < 10 ? '0' + (index + 1) : index + 1;
        return factory.seed({
          start: new Date(`2020-01-${date}`),
          end: new Date(`2020-01-${date}`)
        });
      }
    );

    events = await Promise.all(fixtures);
  });

  afterAll(async () => {
    await client.dropDatabase();
    await client.close();
  });

  describe('#getEventByUid', () => {
    describe('when uid exists', () => {
      it('should resolve with json', async () => {
        const fixture = events[0];
        await expect(
          eventsQueryResolvers.getEventByUid({}, { uid: fixture.toJson()._id })
        ).resolves.toEqual(fixture.toJson());
      });
    });

    describe('when uid does not exist', () => {
      it('should resolve with json', async () => {
        await expect(
          eventsQueryResolvers.getEventByUid({}, { uid: 'uuid' })
        ).rejects.toThrowError(ResourceNotFoundError);
      });
    });
  });

  describe('#getEvents', () => {
    it('should throw error on page < 0', async () => {
      await expect(
        eventsQueryResolvers.getEvents({}, { page: -1 })
      ).rejects.toThrowError(BadRequestError);
    });

    describe('with full population of results', () => {
      it('should return list of events of the limit length', async () => {
        const results = await eventsQueryResolvers.getEvents({}, { page: 0 });
        expect(results.length).toEqual(10);
      });
    });

    describe('with partial population of results', () => {
      it('should return list of events of the remaining length', async () => {
        const results = await eventsQueryResolvers.getEvents({}, { page: 1 });
        expect(results.length).toEqual(5);
      });
    });

    describe('with page containing no results', () => {
      it('should return empty array', async () => {
        const results = await eventsQueryResolvers.getEvents({}, { page: 2 });
        expect(results.length).toEqual(0);
      });
    });
  });

  describe('#getEventsOnDate', () => {
    describe('with date containing results', () => {
      it('should return results array', async () => {
        const results: any[] = await eventsQueryResolvers.getEventsOnDate(
          {},
          { date: '2020-01-01' }
        );
        expect(results.length).toEqual(1);
        expect(results[0].start).toEqual(new Date('2020-01-01'));
      });

      it('should order by time ascending', async () => {
        const fixture = await factory.seed({
          start: new Date(2020, 0, 1, 12, 0, 0, 0)
        });

        const results: any[] = await eventsQueryResolvers.getEventsOnDate(
          {},
          { date: '2020-01-01' }
        );

        expect(results.length).toEqual(2);
        // should appear in second place
        expect(results[1].start).toEqual(fixture.toJson().start);
      });
    });

    describe('with date containing no results', () => {
      it('should return empty results array', async () => {
        const results: any[] = await eventsQueryResolvers.getEventsOnDate(
          {},
          { date: '2019-01-01' }
        );
        expect(results.length).toEqual(0);
      });
    });
  });
});
