import { gql } from 'apollo-server-express';

export const momentDefinition = gql`
  type Moment {
    _id: ID!
  }
`;
