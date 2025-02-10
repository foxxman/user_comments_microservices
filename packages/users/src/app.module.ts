import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfiguration } from 'common';

import { UsersModule } from '@modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [getConfiguration],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
