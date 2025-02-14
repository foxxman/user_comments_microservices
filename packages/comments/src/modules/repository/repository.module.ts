import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'entities/comment.entity';

import { CommentRepository } from './comment.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('commentsDb'),
        entities: [CommentEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([CommentEntity]),
  ],
  providers: [CommentRepository],
  exports: [CommentRepository],
})
export class RepositoryModule {}
