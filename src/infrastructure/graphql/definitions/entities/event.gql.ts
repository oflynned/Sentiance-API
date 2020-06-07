import { gql } from 'apollo-server-express';

export const eventDefinition = gql`
  type Event {
    _id: ID!
    type: String
    start: String
    end: String
    analysis_type: String
    latitude: Float
    longitude: Float
    mode: String
  }
`;
