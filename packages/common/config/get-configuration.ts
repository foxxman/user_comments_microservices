import { IConfig } from "./config.types";

export const getConfiguration = (): IConfig => ({
  database: {
    host: process.env.DB_HOST || "users",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
  },
  usersDb: process.env.USERS_DB || "users",
  commentsDb: process.env.COMMENTS_DB || "comments",
  gatewayPort: parseInt(process.env.GATEWAY_PORT || "3000", 10),
  usersUrl: process.env.USERS_URL || "localhost:3001",
  commentsUrl: process.env.COMMENTS_URL || "localhost:3002",
});
