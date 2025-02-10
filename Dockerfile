FROM node:22.12-alpine3.19

RUN npm install -g pm2

WORKDIR /app
COPY package.json ./
RUN yarn install --network-timeout=300000
COPY . .
COPY ./packages/common /app/packages/common

WORKDIR /app/packages/common
RUN npx tsc --project ./
WORKDIR /app
RUN yarn build
EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
