import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES_NAMES } from 'common';
import { join } from 'path';

import { CommentsController } from './comments.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICES_NAMES.COMMENTS,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'comments',
            protoPath: join(__dirname, '../../../../grpc/comments.proto'),
            url: configService.get<string>('commentsUrl'),
          },
        }),
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
