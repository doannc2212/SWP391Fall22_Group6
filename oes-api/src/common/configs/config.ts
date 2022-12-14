import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 8079,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'OES API',
    description: 'The Online Examination System API description',
    version: '1.0',
    path: 'swagger',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '3d',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
