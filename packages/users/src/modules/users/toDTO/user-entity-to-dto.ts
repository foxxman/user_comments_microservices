import { IUserResponse } from 'common';

import { UserEntity } from '@entities/user.entity';

export const userEntityToDto = (user: UserEntity): IUserResponse => {
  return {
    id: user.id,
    username: user.username,
    avatarUrl: user.avatarUrl,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};
