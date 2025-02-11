import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, IToken, ITokenPair } from 'common';
import { randomUUID } from 'crypto';
import { addDays, addMinutes } from 'date-fns';

import { RefreshTokenRepository } from '@modules/repository/refresh-token.repository';

import { UserEntity } from '@entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  private readonly refreshExpiresInDaysDefault = this.configService.get<number>(
    'refreshExpiresInDaysDefault',
  );
  private readonly logger = new Logger(TokenService.name);

  async generateTokenPair(user: UserEntity): Promise<ITokenPair> {
    const pairId = randomUUID();

    const refresh: IToken = await this.createRefreshToken({
      id: user.id,
      pairId,
    });

    this.logger.log({
      message: 'Generated refresh token',
      refresh,
    });

    const token: IToken = await this.signIn({
      id: user.id,
      pairId,
    });

    this.logger.log({
      message: 'Generated access token',
      token,
    });

    return {
      token,
      refresh,
    };
  }

  async signIn({
    id,
    pairId,
  }: {
    id: string;
    pairId: string;
  }): Promise<IToken> {
    const jwtPayload: IJwtPayload = {
      pairId,
      user: {
        id,
      },
    };

    const expiresInMinutes = this.configService.get<number>(
      'jwtExpiresInMinutes',
    );

    return {
      token: this.jwtService.sign(jwtPayload, {
        expiresIn: `${expiresInMinutes}m`,
      }),
      expireAt: addMinutes(Date.now(), expiresInMinutes).toISOString(),
    };
  }

  async createRefreshToken({
    id,
    pairId,
    expiresInDays = this.refreshExpiresInDaysDefault,
  }: {
    id: string;
    pairId: string;
    expiresInDays?: number;
  }): Promise<IToken> {
    this.logger.log({
      message: 'Create refresh token',
      props: {
        pairId,
        id,
        expiresInDays,
      },
    });

    const expiresSeconds: number = 60 * 60 * 24 * expiresInDays;
    const token: string = this.jwtService.sign(
      { pairId },
      {
        expiresIn: `${expiresSeconds}s`,
      },
    );

    this.logger.log('Create refresh token success', {
      props: {
        expiresInDays,
      },
      context: 'createRefreshToken',
    });
    const expireAt = addDays(Date.now(), 60).toISOString();

    await this.refreshTokenRepository.create({ userId: id, token, pairId });

    return {
      token,
      expireAt,
    };
  }
}
