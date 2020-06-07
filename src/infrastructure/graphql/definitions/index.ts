import { queryDefinition } from './base/query.gql';
import { healthDefinition } from './entities/health.gql';
import { eventDefinition } from './entities/event.gql';
import { scalarDefinition } from './entities/scalars.gql';

export const typeDefs = [
  queryDefinition,
  healthDefinition,
  eventDefinition,
  scalarDefinition
];
