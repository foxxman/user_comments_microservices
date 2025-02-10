import { Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IUsersService, SERVICES_NAMES } from 'common';
import { lastValueFrom, timeout } from 'rxjs';

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

  @Post('signUp')
  async createUser(): Promise<{ id: string; username: string }> {
    return lastValueFrom(
      this.usersService
        .createUser({ username: 'test', password: 'test' })
        .pipe(timeout(REQUEST_TIMEOUT)),
    );
  }
}
