import { IConfig } from './config.types';

export const getConfiguration = (): IConfig => ({
  databaseUrl: process.env.DATABASE_URL || '',
  usersDb: process.env.USERS_DB || 'users',
  commentsDb: process.env.COMMENTS_DB || 'comments',
  gatewayPort: parseInt(process.env.GATEWAY_PORT || '3000', 10),
  usersUrl: process.env.USERS_URL || 'localhost:3001',
  commentsUrl: process.env.COMMENTS_URL || 'localhost:3002',
});
