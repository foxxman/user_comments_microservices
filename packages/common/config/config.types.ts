export interface IConfig {
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
  };
  usersDb: string;
  commentsDb: string;
  gatewayPort: number;
  usersUrl: string;
  commentsUrl: string;
}
