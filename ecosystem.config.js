module.exports = {
  apps: [
    {
      name: "gateway",
      script: "packages/gateway/dist/main.js",
    },
    {
      name: "users",
      script: "packages/users/dist/main.js",
      exec_mode: "fork",
      autorestart: true,
      env: {
        DATABASE_HOST: "postgres",
        DATABASE_PORT: 5432,
      },
      before_start:
        "/usr/local/bin/wait-for-it postgres:5432 -- yarn workspace users run seed",
    },
    {
      name: "comments",
      script: "packages/comments/dist/main.js",
    },
    {
      name: "common",
      script: "packages/common/dist/index.js",
    },
  ],
};
