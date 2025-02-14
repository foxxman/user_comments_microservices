import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { isUUID } from 'class-validator';
import {
  CommentsExceptions,
  ICreateCommentDTO,
  IDeleteCommentDTO,
  IGetCommentsDTO,
  IUpdateCommentDTO,
  IUsersService,
  SERVICES_NAMES,
} from 'common';
import { CommentEntity } from 'entities/comment.entity';
import { lastValueFrom, timeout } from 'rxjs';

import { CommentRepository } from '@modules/repository/comment.repository';

const REQUEST_TIMEOUT = 30 * 1000;

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    @Inject(SERVICES_NAMES.USERS) private userGrpcClient: ClientGrpc,
  ) {}

  async createComment(data: ICreateCommentDTO): Promise<CommentEntity> {
    const usersService: IUsersService =
      this.userGrpcClient.getService<IUsersService>('UsersService');

    await lastValueFrom(
      usersService
        .getUserById({ id: data.userId })
        .pipe(timeout(REQUEST_TIMEOUT)),
    );

    return this.commentRepository.create(data);
  }

  async updateComment(data: IUpdateCommentDTO): Promise<CommentEntity> {
    if (!isUUID(data.commentId, '4')) {
      throw new RpcException(CommentsExceptions.CommentNotFound);
    }

    const comment = await this.commentRepository.findOne({
      id: data.commentId,
    });

    if (!comment) {
      throw new RpcException(CommentsExceptions.CommentNotFound);
    }

    if (comment.userId !== data.userId) {
      throw new RpcException(CommentsExceptions.UserNotCommentOwner);
    }

    return this.commentRepository.update(data.commentId, {
      text: data.text,
    });
  }

  async getComments(
    data: IGetCommentsDTO,
  ): Promise<{ total: number; comments: CommentEntity[] }> {
    const total = await this.commentRepository.count({
      where: { userId: data.userId },
    });

    const comments = await this.commentRepository.find({
      where: { userId: data.userId },
      offset: data.offset,
      limit: data.limit,
    });

    return { total, comments };
  }

  async deleteComment(data: IDeleteCommentDTO): Promise<CommentEntity> {
    if (!isUUID(data.commentId, '4')) {
      throw new RpcException(CommentsExceptions.CommentNotFound);
    }

    const comment = await this.commentRepository.findOne({
      id: data.commentId,
    });

    if (!comment) {
      throw new RpcException(CommentsExceptions.CommentNotFound);
    }

    if (comment.userId !== data.userId) {
      throw new RpcException(CommentsExceptions.UserNotCommentOwner);
    }

    return this.commentRepository.delete(data.commentId);
  }
}
