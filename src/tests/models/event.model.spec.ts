import { EventFactory } from '../factories/event.factory';

describe('Event model', () => {
  const factory: EventFactory = EventFactory.getInstance();

  describe('schema', () => {
    it('should require type', async () => {
      await expect(factory.build());
    });
  });
});
