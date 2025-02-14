import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiQuery } from '@nestjs/swagger';
import { ICommentsService, SERVICES_NAMES } from 'common';
import { lastValueFrom, timeout } from 'rxjs';

import { AuthorizedRequest } from '@custom-types/auth';
import { GUARD_NAMES } from '@custom-types/guards';

import { API_METHODS } from '@constants/decorators';

import { RestApiRoute } from '@decorators/rest-api-route';

import { CreateCommentDTO, UpdateCommentDTO } from './dto';
import { CommentResponse, GetCommentsResponse } from './responses';

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

  @RestApiRoute({
    method: API_METHODS.PUT,
    path: '/:commentId',
    summary: 'Update comment',
    response: {
      httpCode: HttpStatus.OK,
      description: 'Comment updated',
      type: CommentResponse,
    },
    guardsToUse: [GUARD_NAMES.AUTH],
  })
  async updateComment(
    @Req() req: AuthorizedRequest,
    @Body() data: UpdateCommentDTO,
    @Param('commentId')
    commentId: string,
  ): Promise<CommentResponse> {
    return await lastValueFrom(
      this.commentsService
        .updateComment({ ...data, commentId, userId: req.user.id })
        .pipe(timeout(REQUEST_TIMEOUT)),
    );
  }

  @RestApiRoute({
    method: API_METHODS.GET,
    path: '/',
    summary: 'Get my comments list',
    response: {
      httpCode: HttpStatus.OK,
      description: 'Comment list',
      type: GetCommentsResponse,
    },
    guardsToUse: [GUARD_NAMES.AUTH],
    additionalDecorators: [
      ApiQuery({
        name: 'offset',
        required: true,
        description: 'Pagination offset',
        example: 0,
      }),
      ApiQuery({
        name: 'limit',
        required: true,
        description: 'Number of items to get',
        example: 10,
      }),
    ],
  })
  async getComments(
    @Req() req: AuthorizedRequest,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<GetCommentsResponse> {
    return await lastValueFrom(
      this.commentsService
        .getComments({ userId: req.user.id, offset, limit })
        .pipe(timeout(REQUEST_TIMEOUT)),
    );
  }

  @RestApiRoute({
    method: API_METHODS.DELETE,
    path: '/:commentId',
    summary: 'Remove comment by ID',
    response: {
      httpCode: HttpStatus.OK,
      description: 'Removed comment',
      type: CommentResponse,
    },
    guardsToUse: [GUARD_NAMES.AUTH],
  })
  async deleteComment(
    @Req() req: AuthorizedRequest,
    @Param('commentId')
    commentId: string,
  ): Promise<CommentResponse> {
    return await lastValueFrom(
      this.commentsService
        .deleteComment({ userId: req.user.id, commentId })
        .pipe(timeout(REQUEST_TIMEOUT)),
    );
  }
}
