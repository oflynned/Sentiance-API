require('dotenv').config();

import { ExampleDataset } from './example-dataset';
import { DatabaseHelper } from '../common/database';

(async () => {
  // setup resource from config
  await DatabaseHelper.registerDatabase({
    uri: process.env.MONGODB_URI
  });

  // purge old datasets
  await global.databaseClient.dropDatabase();

  // run seeds to populate the db
  await new ExampleDataset().run();

  // close the resource connection
  await global.databaseClient.close();
})();
