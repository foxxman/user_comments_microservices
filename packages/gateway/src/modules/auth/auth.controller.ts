import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IUsersService, SERVICES_NAMES } from 'common';
import { lastValueFrom, timeout } from 'rxjs';

import { API_METHODS } from '@constants/decorators';

import { RestApiRoute } from '@decorators/rest-api-route';

import { CreateUserDto } from './dto';
import { LoginResponse } from './responses';

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
}
