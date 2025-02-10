import { IUserResponse } from 'common';

import { UserEntity } from '@entities/user.entity';

export const userEntityToDto = (user: UserEntity): IUserResponse => {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};
