import { Event, EventType } from '../../models/event.model';
import { address } from 'faker';

export class EventFactory {
  private constructor() {}

  static getInstance(): EventFactory {
    return new EventFactory();
  }

  private static buildType(): string {
    const types = ['Stationary', 'Transport'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private static buildProperties(overrides?: Partial<EventType>): EventType {
    return {
      ...({
        type: this.buildType(),
        start: new Date(),
        end: new Date(),
        analysis_type: 'processed',
        latitude: parseFloat(address.latitude()),
        longitude: parseFloat(address.longitude()),
        location: {
          significance: 'home'
        }
      } as EventType),
      ...overrides
    };
  }

  build(overrides?: Partial<EventType>): Event {
    const properties = EventFactory.buildProperties(overrides);
    return new Event().build(properties) as Event;
  }

  async seed(overrides?: Partial<EventType>): Promise<Event> {
    return this.build(overrides).save();
  }
}
