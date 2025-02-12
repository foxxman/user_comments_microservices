import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  OnModuleInit,
  Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IUsersService, SERVICES_NAMES } from 'common';
import { lastValueFrom, timeout } from 'rxjs';

import { AuthorizedRequest } from '@custom-types/auth';
import { GUARD_NAMES } from '@custom-types/guards';

import { API_METHODS } from '@constants/decorators';

import { RestApiRoute } from '@decorators/rest-api-route';

import { CreateUserDto, LoginDto, RefreshDTO } from './dto';
import { LoginResponse, RefreshResponse, UserResponse } from './responses';

const REQUEST_TIMEOUT = 30 * 1000;

@ApiTags('auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private usersService: IUsersService;

  constructor(
    @Inject(SERVICES_NAMES.USERS) private authGrpcClient: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.usersService =
      this.authGrpcClient.getService<IUsersService>('UsersService');
  }

  @RestApiRoute({
    method: API_METHODS.POST,
    path: '/',
    summary: 'Create new user',
    response: {
      httpCode: HttpStatus.CREATED,
      description: 'User created',
      type: LoginResponse,
    },
  })
  async createUser(@Body() data: CreateUserDto): Promise<LoginResponse> {
    return await lastValueFrom(
      this.usersService.createUser(data).pipe(timeout(REQUEST_TIMEOUT)),
    );
  }

  @RestApiRoute({
    method: API_METHODS.POST,
    path: '/login',
    summary: 'Login with username and password',
    response: {
      httpCode: HttpStatus.OK,
      description: 'Login and password passed',
      type: LoginResponse,
    },
  })
  async loginWithUsernameAndPassword(
    @Body() data: LoginDto,
  ): Promise<LoginResponse> {
    return await lastValueFrom(
      this.usersService
        .loginWithUsernameAndPassword(data)
        .pipe(timeout(REQUEST_TIMEOUT)),
    );
  }

  @RestApiRoute({
    method: API_METHODS.PUT,
    path: '/refresh',
    summary: 'Refresh access token',
    response: {
      httpCode: HttpStatus.OK,
      description: 'Refresh token',
      type: RefreshResponse,
    },
  })
  async refreshAccessToken(@Body() data: RefreshDTO): Promise<RefreshResponse> {
    return await lastValueFrom(
      this.usersService.refreshAccessToken(data).pipe(timeout(REQUEST_TIMEOUT)),
    );
  }

  @RestApiRoute({
    method: API_METHODS.GET,
    path: '/me',
    summary: 'Get user by access token',
    response: {
      httpCode: HttpStatus.OK,
      description: 'User object',
      type: UserResponse,
    },
    guardsToUse: [GUARD_NAMES.AUTH],
  })
  async getMe(@Req() req: AuthorizedRequest): Promise<UserResponse> {
    return await lastValueFrom(
      this.usersService
        .getUserById({ id: req.user.id })
        .pipe(timeout(REQUEST_TIMEOUT)),
    );
  }
}
