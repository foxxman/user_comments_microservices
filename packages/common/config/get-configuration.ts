import { IConfig } from "./config.types";

export const getConfiguration = (): IConfig => ({
  jwtSecret: process.env.JWT_SECRET || "secret",
  jwtExpiresInMinutes: parseInt(process.env.JWT_EXPIRES_IN_MINUTES || "20", 10),
  refreshExpiresInDaysDefault: parseInt(
    process.env.REFRESH_EXPIRES_IN_DAYS_DEFAULT || "5",
    10
  ),
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
