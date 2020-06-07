import { queryDefinition } from './base/query.gql';
import { healthDefinition } from './entities/health.gql';
import { eventDefinition } from './entities/event.gql';

export const typeDefs = [queryDefinition, healthDefinition, eventDefinition];
