import { Module } from '@nestjs/common';

import { RepositoryModule } from '@modules/repository/repository.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [RepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
