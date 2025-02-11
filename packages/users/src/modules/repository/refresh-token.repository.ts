import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenEntity } from '@entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  async findOne(where: {
    id?: string;
    pairId?: string;
    userId?: string;
  }): Promise<RefreshTokenEntity | null> {
    const token = await this.refreshTokenRepository.findOne({ where });
    return token;
  }

  async create({
    pairId,
    userId,
    token,
  }: {
    pairId: string;
    userId: string;
    token: string;
  }): Promise<RefreshTokenEntity> {
    const user = this.refreshTokenRepository.create({
      pairId,
      userId,
      token,
    });
    return this.refreshTokenRepository.save(user);
  }
}
