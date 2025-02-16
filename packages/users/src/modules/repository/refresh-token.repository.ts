import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

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
    expireAt,
  }: {
    pairId: string;
    userId: string;
    token: string;
    expireAt: Date;
  }): Promise<RefreshTokenEntity> {
    const createdToken = this.refreshTokenRepository.create({
      pairId,
      userId,
      token,
      expireAt,
    });
    return this.refreshTokenRepository.save(createdToken);
  }

  async delete(where: {
    pairId?: string;
    token?: string;
  }): Promise<RefreshTokenEntity | null> {
    const token = await this.refreshTokenRepository.findOne({ where });

    if (token) {
      await this.refreshTokenRepository.delete(where);
    }

    return token;
  }

  async deleteMany(where: FindOptionsWhere<RefreshTokenEntity>) {
    await this.refreshTokenRepository.delete(where);
  }
}
