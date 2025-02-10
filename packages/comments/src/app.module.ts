import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfiguration } from 'common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [getConfiguration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
