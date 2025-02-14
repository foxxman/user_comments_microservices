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
      url: process.env.COMMENTS_URL || 'localhost:3002',
      package: 'comments',
      protoPath: join(__dirname, '../../grpc/comments.proto'),
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
