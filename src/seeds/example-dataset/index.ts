import dataset from './dataset.json';
import { Seed } from '../seed.base';
import { MomentHistory } from '../../models/moment-history.model';
import { EventHistory } from '../../models/event-history.model';
import { Segment } from '../../models/segment';
import { Logger } from '../../common/logger';

export class ExampleDataset extends Seed {
  private logger: Logger = Logger.getInstance('api.seeds.example-dataset');

  async run(): Promise<void> {
    const {
      moment_history: momentHistory,
      event_history: eventHistory,
      segments
    } = dataset.data.user;

    this.logger.info('Seeding moment history ...');
    await Promise.all(
      momentHistory.map(
        (moment: object): Promise<MomentHistory> => {
          return new MomentHistory().build(moment as any).save();
        }
      )
    );

    this.logger.info('Seeding event history ...');
    await Promise.all(
      eventHistory.map(
        (event: object): Promise<EventHistory> => {
          return new EventHistory().build(event as any).save();
        }
      )
    );

    this.logger.info('Seeding segments ...');
    await Promise.all(
      segments.map(
        (segment: object): Promise<Segment> => {
          return new Segment().build(segment as any).save();
        }
      )
    );

    // const a = eventHistory.reduce((acc: Set<string>, item: any) => {
    //   const keys: string[] = Object.keys(item);
    //   keys.map(key => acc.add(key));
    //   return acc;
    // }, new Set<string>());
    //
    // console.log(a);
  }
}
