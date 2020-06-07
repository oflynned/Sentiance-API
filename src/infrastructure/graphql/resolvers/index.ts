export const resolvers = {
  Query: {
    healthCheck: async (): Promise<object> => {
      return {
        ping: 'pong'
      };
    }
  }
};
