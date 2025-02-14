import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(where: {
    id?: string;
    username?: string;
    isAdmin?: boolean;
  }): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where });
    return user;
  }

  async create({
    username,
    passwordHash,
    salt,
    isAdmin = false,
  }: {
    username: string;
    passwordHash: string;
    salt: string;
    isAdmin?: boolean;
  }): Promise<UserEntity> {
    const user = this.userRepository.create({
      username,
      passwordHash,
      salt,
      isAdmin,
    });
    return this.userRepository.save(user);
  }

  async update(
    id: string,
    data: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const user = await this.findOne({ id });

    if (user) {
      return this.userRepository.save({ ...user, ...data });
    }

    return null;
  }
}
