import { queryDefinition } from './base/query.gql';
import { healthDefinition } from './entities/health.gql';
import { eventDefinition } from './entities/event.gql';
import { momentDefinition } from './entities/moment.gql';
import { scalarDefinition } from './entities/scalars.gql';

export const typeDefs = [
  queryDefinition,
  healthDefinition,
  momentDefinition,
  eventDefinition,
  scalarDefinition
];
