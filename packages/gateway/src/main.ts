import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { exceptionFactory } from '@pipes/validation-exception.factory';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'debug'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('User comments API')
    .addBearerAuth()
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
