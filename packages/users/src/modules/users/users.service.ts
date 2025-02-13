import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ICreateUserDTO, IGetUserByIdDTO, UsersExceptions } from 'common';

import { UserRepository } from '@modules/repository/user.repository';

import { hashPassword } from '@utils/hash';

import { UserEntity } from '@entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async createUser({
    username,
    password,
  }: ICreateUserDTO): Promise<UserEntity> {
    this.logger.log({
      message: `Create user`,
      props: { username, password },
    });

    const existingUser = await this.userRepository.findOne({ username });
    if (existingUser) {
      this.logger.error({
        message: `User already exists`,
        props: { username },
        existingUser,
      });
      throw new RpcException(UsersExceptions.UserAlreadyExists);
    }

    const { hash: passwordHash, salt } = await hashPassword(password);

    const user = await this.userRepository.create({
      username,
      passwordHash,
      salt,
    });

    this.logger.log({
      message: `User was created`,
      user,
    });

    return user;
  }

  async getUserById(data: IGetUserByIdDTO): Promise<UserEntity> {
    this.logger.log({
      message: `getUserById`,
      props: { id: data.id },
    });
    const user = await this.userRepository.findOne({ id: data.id });

    if (!user) {
      this.logger.error({
        message: `User not found`,
        props: { id: data.id },
      });
      throw new RpcException(UsersExceptions.UserNotFound);
    }

    this.logger.log({
      message: `Got user`,
      user,
    });

    return user;
  }

  async updateAvatar({
    avatarUrl,
    userId,
  }: {
    avatarUrl: string;
    userId: string;
  }): Promise<UserEntity> {
    this.logger.log({
      message: `Update avatar`,
      props: { avatarUrl, userId },
    });

    return this.userRepository.update(userId, { avatarUrl });
  }
}
