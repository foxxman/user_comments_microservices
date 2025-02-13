import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES_NAMES } from 'common';
import { join } from 'path';

import { UsersController } from './users.controller';

@Module({
  imports: [
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
