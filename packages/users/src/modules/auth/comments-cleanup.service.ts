import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Raw } from 'typeorm';

import { RefreshTokenRepository } from '@modules/repository/refresh-token.repository';

@Injectable()
export class RefreshTokenCleanupService {
  constructor(private readonly tokenRepository: RefreshTokenRepository) {}

  @Cron(CronExpression.EVERY_HOUR)
  async removeExpiredComments() {
    await this.tokenRepository.deleteMany({
      expireAt: Raw((alias) => `${alias} < NOW()`),
    });
  }
}
