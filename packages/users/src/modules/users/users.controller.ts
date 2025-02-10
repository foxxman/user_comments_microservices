import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IUserResponse } from 'common';

import { userEntityToDto } from './toDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService')
  async createUser(data: {
    username: string;
    password: string;
  }): Promise<IUserResponse> {
    return userEntityToDto(await this.usersService.createUser(data));
  }
}
