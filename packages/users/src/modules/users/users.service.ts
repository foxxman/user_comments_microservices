import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ICreateUserDTO, UsersExceptions } from 'common';

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
}
