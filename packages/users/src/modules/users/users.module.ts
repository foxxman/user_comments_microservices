import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '@modules/auth/auth.module';
import { RepositoryModule } from '@modules/repository/repository.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [RepositoryModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
