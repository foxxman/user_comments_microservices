import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  OnModuleInit,
  Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ICommentsService, SERVICES_NAMES } from 'common';
import { lastValueFrom, timeout } from 'rxjs';

import { AuthorizedRequest } from '@custom-types/auth';
import { GUARD_NAMES } from '@custom-types/guards';

import { API_METHODS } from '@constants/decorators';

import { RestApiRoute } from '@decorators/rest-api-route';

import { CreateCommentDTO } from './dto';
import { CommentResponse } from './responses';

const REQUEST_TIMEOUT = 30 * 1000;

@Controller('comments')
export class CommentsController implements OnModuleInit {
  private commentsService: ICommentsService;

  constructor(
    @Inject(SERVICES_NAMES.COMMENTS) private userGrpcClient: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.commentsService =
      this.userGrpcClient.getService<ICommentsService>('CommentsService');
  }

  @RestApiRoute({
    method: API_METHODS.POST,
    path: '/',
    summary: 'Create new comment',
    response: {
      httpCode: HttpStatus.CREATED,
      description: 'Comment created',
      type: CommentResponse,
    },
    guardsToUse: [GUARD_NAMES.AUTH],
  })
  async createComment(
    @Req() req: AuthorizedRequest,
    @Body() data: CreateCommentDTO,
  ): Promise<CommentResponse> {
    return await lastValueFrom(
      this.commentsService
        .createComment({ ...data, userId: req.user.id })
        .pipe(timeout(REQUEST_TIMEOUT)),
    );
  }
}
