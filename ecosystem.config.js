module.exports = {
  apps: [
    {
      name: "gateway",
      script: "packages/gateway/dist/main.js",
    },
    {
      name: "users",
      script: "packages/users/dist/main.js",
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
