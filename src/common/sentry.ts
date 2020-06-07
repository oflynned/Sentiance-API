import * as Sentry from '@sentry/node';
import { Environment } from '../config/environment';
import { SentryOptions } from '../config/sentry.config';
import { Logger } from './logger';

export class SentryFacade {
  private static logger: Logger = Logger.getInstance('api.common.sentry');

  static registerSentry(config: SentryOptions) {
    if (Environment.isProduction()) {
      Sentry.init(config);
      this.logger.info('Registered Sentry on production environment');
    } else {
      this.logger.info(
        `Sentry is not registered in environment (${Environment.getNodeEnv()})`
      );
    }
  }

  static captureException(e: Error) {
    if (Environment.isProduction()) {
      Sentry.captureException(e);
    }
  }
}
