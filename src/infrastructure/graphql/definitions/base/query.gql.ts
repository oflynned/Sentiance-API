import { gql } from 'apollo-server-express';

export const queryDefinition = gql`
  type Query {
    healthCheck: HealthCheck
  }
`;
