import { InternalServerErrorException } from '@nestjs/common';
import { UsersExceptions } from 'common';

import {
  PasswordInvalidException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from './users';

type Constructor = { new (...args: any[]): any };

const usersMap: { [key: string]: Constructor } = {
  [UsersExceptions.UserNotFound]: UserNotFoundException,
  [UsersExceptions.UserAlreadyExists]: UserAlreadyExistsException,
  [UsersExceptions.PasswordInvalid]: PasswordInvalidException,
};

export const classes: { [key: string]: Constructor } = {
  ...usersMap,
};

export class DynamicException extends Error {
  constructor(className: string, ...opts: any) {
    super(...opts);
    const Exception = classes[className];
    if (!Exception) {
      return new InternalServerErrorException();
    }
    return new Exception(...opts);
  }
}
