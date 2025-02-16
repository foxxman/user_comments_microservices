import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import {
  IJwtPayload,
  IRefreshJwtPayload,
  IToken,
  ITokenPair,
  UsersExceptions,
} from 'common';
import { randomUUID } from 'crypto';
import { addDays, addMinutes } from 'date-fns';

import { RefreshTokenRepository } from '@modules/repository/refresh-token.repository';
import { UserRepository } from '@modules/repository/user.repository';

import { UserEntity } from '@entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
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
      isAdmin: user.isAdmin,
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
    isAdmin,
  }: {
    id: string;
    pairId: string;
    isAdmin: boolean;
  }): Promise<IToken> {
    const jwtPayload: IJwtPayload = {
      pairId,
      user: {
        id,
        isAdmin,
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
    const expireAt = addDays(Date.now(), 60);

    await this.refreshTokenRepository.create({
      userId: id,
      token,
      pairId,
      expireAt,
    });

    return {
      token,
      expireAt: expireAt.toISOString(),
    };
  }

  async refreshAccessToken(token: string): Promise<{
    user: UserEntity;
    tokens: ITokenPair;
  }> {
    const result = this.jwtService.decode(token);

    if (!result) {
      this.logger.error({
        message: `Refresh token is invalid`,
        props: { result },
      });
      throw new RpcException(UsersExceptions.RefreshTokenInvalid);
    }

    const { pairId } = result as IRefreshJwtPayload;

    const deletedToken = await this.refreshTokenRepository.delete({
      token,
      pairId,
    });

    if (!deletedToken) {
      this.logger.error({
        message: `Refresh token not found`,
        props: { pairId, deletedToken },
      });
      throw new RpcException(UsersExceptions.RefreshNotFound);
    }

    const { userId } = deletedToken;
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      this.logger.error({
        message: `User not found`,
        props: { userId },
      });
      throw new RpcException(UsersExceptions.UserNotFound);
    }

    const tokens = await this.generateTokenPair(user);

    return {
      user,
      tokens,
    };
  }
}
