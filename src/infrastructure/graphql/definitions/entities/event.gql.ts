import { gql } from 'apollo-server-express';

export const eventDefinition = gql`
  type Event {
    _id: ID!
    type: String
    start: DateTime
    end: DateTime
    analysis_type: String
    latitude: Float
    longitude: Float
    mode: String
    moments: Moment
  }
`;
