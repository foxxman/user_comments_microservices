import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService')
  createUser(data: { username: string; password: string }) {
    return this.usersService.createUser(data);
  }
}
