import { gql } from 'apollo-server-express';

export const queryDefinition = gql`
  type Query {
    healthCheck: HealthCheck
    getEventByUid(uid: String): Event
    getEventsOnDate(startDate: String): [Event]
    getEvents(page: Int): [Event]
  }
`;
