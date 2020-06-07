require('dotenv').config();

import * as http from 'http';
import { Server } from './server';

import { sentryConfig } from '../config/sentry.config';
import { dbConfig } from '../config/database.config';
import { serverConfig } from '../config/server.config';

import { SentryFacade } from '../common/sentry';
import { DatabaseHelper } from '../common/database';

export class App {
  private constructor() {}

  static getInstance(): App {
    return new App();
  }

  async start(): Promise<http.Server> {
    await DatabaseHelper.registerDatabase(dbConfig());
    SentryFacade.registerSentry(sentryConfig());

    return new Server().build().listen(serverConfig().port);
  }
}

(async () => await App.getInstance().start())();