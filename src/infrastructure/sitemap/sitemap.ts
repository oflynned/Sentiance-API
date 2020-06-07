import { Application, NextFunction, Request, Response } from 'express';

import indexRouter from '../routes';
import fallbackRouter from '../routes/fallback.route';
import { HttpError, HttpErrorType } from '../errors/http.error';
import { Logger } from '../../common/logger';
import { Environment } from '../../config/environment';

const logger: Logger = Logger.getInstance('api.infrastructure.sitemap');

export const sitemap = (app: Application): void => {
  app.use('/', indexRouter);
  app.use(fallbackRouter);

  app.use(
    (
      internalError: HttpError,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (Environment.isProduction()) {
        if (internalError.status >= 500) {
          // let's report to sentry instead of logging to the console
          // SentryFacade.captureException(internalError);
        }
      } else {
        console.error(internalError);
      }

      // INFO HttpErrorType is used as it needs to extend `Error` for tests to accept a throw and here we need to infer some internal properties
      const error = internalError as HttpErrorType & any;
      res.status(error._status);

      // we don't want any stacktraces to bleed to the client so let's provide some useful context
      res.json({
        name: error._name,
        time: error._time,
        status: error._status,
        context: error._context
      });

      next();
    }
  );
};
