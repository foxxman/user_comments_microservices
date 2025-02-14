import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICommentResponse,
  ICreateCommentDTO,
  IGetCommentsDTO,
  IGetCommentsResponse,
  IUpdateCommentDTO,
} from 'common';

import { CommentsService } from './comments.service';
import { commentEntityToDto } from './toDTO';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @GrpcMethod('CommentsService')
  async createComment(data: ICreateCommentDTO): Promise<ICommentResponse> {
    const comment = await this.commentsService.createComment(data);
    return commentEntityToDto(comment);
  }

  @GrpcMethod('CommentsService')
  async updateComment(data: IUpdateCommentDTO): Promise<ICommentResponse> {
    const comment = await this.commentsService.updateComment(data);
    return commentEntityToDto(comment);
  }

  @GrpcMethod('CommentsService')
  async getComments(data: IGetCommentsDTO): Promise<IGetCommentsResponse> {
    const { total, comments } = await this.commentsService.getComments(data);
    return {
      total,
      comments: comments.map(commentEntityToDto),
    };
  }
}
