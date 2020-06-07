require('dotenv').config();

import * as http from 'http';
import { Server } from './server';
import { DatabaseHelper } from '../common/database';

import { dbConfig } from '../config/database.config';
import { serverConfig } from '../config/server.config';

export class App {
  private constructor() {}

  static getInstance(): App {
    return new App();
  }

  async start(): Promise<http.Server> {
    await DatabaseHelper.registerDatabase({
      uri: 'mongodb://localhost:27017/sentiance-api'
    });

    return new Server().build().listen(serverConfig().port);
  }
}

(async () => await App.getInstance().start())();
