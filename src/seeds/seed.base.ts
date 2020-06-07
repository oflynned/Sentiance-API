export abstract class Seed {
  abstract async run(): Promise<void>;
}
