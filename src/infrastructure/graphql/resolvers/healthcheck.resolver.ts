export const healthCheckQueryResolvers = {
  healthCheck: (): object => {
    return {
      ping: 'pong'
    };
  }
};
