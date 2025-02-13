import {
  Controller,
  HttpStatus,
  Inject,
  OnModuleInit,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { IUsersService, SERVICES_NAMES } from 'common';
import { lastValueFrom, timeout } from 'rxjs';

import { UserResponse } from '@modules/auth/responses';

import { AuthorizedRequest } from '@custom-types/auth';
import { GUARD_NAMES } from '@custom-types/guards';

import { API_METHODS } from '@constants/decorators';

import { RestApiRoute } from '@decorators/rest-api-route';

const REQUEST_TIMEOUT = 30 * 1000;

@Controller('users')
export class UsersController implements OnModuleInit {
  private usersService: IUsersService;

  constructor(
    @Inject(SERVICES_NAMES.USERS) private userGrpcClient: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.usersService =
      this.userGrpcClient.getService<IUsersService>('UsersService');
  }

  @RestApiRoute({
    method: API_METHODS.POST,
    path: '/avatar',
    summary: 'Upload and set user avatar',
    response: {
      httpCode: HttpStatus.CREATED,
      description: 'Avatar uploaded successfully',
      type: UserResponse,
    },
    guardsToUse: [GUARD_NAMES.AUTH],
    interceptors: [FileInterceptor('file')],
    additionalDecorators: [
      ApiConsumes('multipart/form-data'),
      ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      }),
    ],
  })
  async uploadAvatar(
    @Req() req: AuthorizedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return lastValueFrom(
      this.usersService
        .updateAvatar({
          filename: file.originalname,
          buffer: file.buffer,
          userId: req.user.id,
        })
        .pipe(timeout(REQUEST_TIMEOUT)),
    );
  }
}
