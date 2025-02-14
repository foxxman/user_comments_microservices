import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES_NAMES } from 'common';
import { join } from 'path';

import { RepositoryModule } from '@modules/repository/repository.module';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    RepositoryModule,
    ClientsModule.registerAsync([
      {
        name: SERVICES_NAMES.USERS,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'users',
            protoPath: join(__dirname, '../../../../grpc/users.proto'),
            url: configService.get<string>('usersUrl'),
          },
        }),
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
