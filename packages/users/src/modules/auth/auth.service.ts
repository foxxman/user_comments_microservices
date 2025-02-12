import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ILoginDTO, UsersExceptions } from 'common';

import { UserRepository } from '@modules/repository/user.repository';

import { verifyPassword } from '@utils/hash';

import { UserEntity } from '@entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async checkUsernameAndPassword({
    username,
    password,
  }: ILoginDTO): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      username,
    });

    if (!user) {
      this.logger.error({
        message: `User not found`,
        props: { username },
      });
      throw new RpcException(UsersExceptions.UserNotFound);
    }

    const isPasswordCorrect = await verifyPassword(password, user.passwordHash);

    if (!isPasswordCorrect) {
      this.logger.error({
        message: `Password invalid`,
        props: { username, password },
      });
      throw new RpcException(UsersExceptions.PasswordInvalid);
    }

    return user;
  }
}
