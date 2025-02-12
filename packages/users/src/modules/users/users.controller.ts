import { Controller, Inject, forwardRef } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreateUserDTO,
  ILoginDTO,
  ILoginResponse,
  IRefreshDTO,
  IRefreshResponse,
} from 'common';

import { AuthService } from '@modules/auth/auth.service';
import { TokenService } from '@modules/auth/token.service';

import { userEntityToDto } from './toDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @GrpcMethod('UsersService')
  async createUser(data: ICreateUserDTO): Promise<ILoginResponse> {
    const user = await this.usersService.createUser(data);
    const tokenPair = await this.tokenService.generateTokenPair(user);

    return { user: userEntityToDto(user), tokenPair };
  }

  @GrpcMethod('UsersService')
  async loginWithUsernameAndPassword(data: ILoginDTO): Promise<ILoginResponse> {
    const user = await this.authService.checkUsernameAndPassword(data);
    const tokenPair = await this.tokenService.generateTokenPair(user);

    return { user: userEntityToDto(user), tokenPair };
  }

  @GrpcMethod('UsersService')
  async refreshAccessToken(data: IRefreshDTO): Promise<IRefreshResponse> {
    const { user, tokens } = await this.tokenService.refreshAccessToken(
      data.refresh,
    );
    return { user: userEntityToDto(user), tokens };
  }
}
