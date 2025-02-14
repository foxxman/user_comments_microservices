import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'debug'],
  });

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: process.env.USERS_URL || 'localhost:3001',
      package: 'users',
      protoPath: join(__dirname, '../../grpc/users.proto'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
