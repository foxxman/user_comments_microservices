import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ILoginResponse } from 'common';

import { TokenService } from '@modules/auth/token.service';

import { userEntityToDto } from './toDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  @GrpcMethod('UsersService')
  async createUser(data: {
    username: string;
    password: string;
  }): Promise<ILoginResponse> {
    const user = await this.usersService.createUser(data);
    const tokenPair = await this.tokenService.generateTokenPair(user);

    return { user: userEntityToDto(user), tokenPair };
  }
}
