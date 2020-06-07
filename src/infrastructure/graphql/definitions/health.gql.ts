import { gql } from 'apollo-server-express';

export const healthDefinition = gql`
  type HealthCheck {
    ping: String
  }
`;
