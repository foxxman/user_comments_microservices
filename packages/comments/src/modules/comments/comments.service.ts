import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ICreateCommentDTO, IUsersService, SERVICES_NAMES } from 'common';
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
}
