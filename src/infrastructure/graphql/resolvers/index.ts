import { eventsQueryResolvers } from './events.resolver';
import { healthCheckQueryResolvers } from './healthcheck.resolver';
import { dateTimeTypeResolver } from './scalars.resolver';

export const resolvers = {
  // custom types
  ...dateTimeTypeResolver,

  // queries
  Query: {
    ...healthCheckQueryResolvers,
    ...eventsQueryResolvers
  }
};
