import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Raw } from 'typeorm';

import { CommentRepository } from '@modules/repository/comment.repository';

@Injectable()
export class CommentCleanupService {
  constructor(private readonly commentRepository: CommentRepository) {}

  @Cron(CronExpression.EVERY_HOUR)
  async removeExpiredComments() {
    await this.commentRepository.delete({
      deleteAfter: Raw((alias) => `${alias} < NOW()`),
    });
  }
}
