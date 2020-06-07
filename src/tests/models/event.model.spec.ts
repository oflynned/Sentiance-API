import { EventFactory } from '../factories/event.factory';

describe('Event model', () => {
  const factory: EventFactory = EventFactory.getInstance();

  describe('schema', () => {
    it('should require valid type', async () => {
      await expect(
        factory.build({ type: 'Not valid' }).validate()
      ).rejects.toThrowError(/must be one of/);
    });
  });
});
