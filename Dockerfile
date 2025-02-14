FROM node:22.12-alpine3.19

RUN apk add --no-cache bash curl
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

RUN curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it

EXPOSE 3000

CMD ["/bin/sh", "-c", "/usr/local/bin/wait-for-it postgres:5432 -- yarn workspace users run seed && pm2-runtime start ecosystem.config.js"]
