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
  minio: {
    endpoint: process.env.MINIO_ENDPOINT || "minio",
    port: parseInt(process.env.MINIO_PORT || "9000", 10),
    accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
    secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
  },
  usersDb: process.env.USERS_DB || "users",
  commentsDb: process.env.COMMENTS_DB || "comments",
  apiUrl: process.env.API_URL || "http://localhost:3000",
  gatewayPort: parseInt(process.env.GATEWAY_PORT || "3000", 10),
  usersUrl: process.env.USERS_URL || "localhost:3001",
  commentsUrl: process.env.COMMENTS_URL || "localhost:3002",
});
