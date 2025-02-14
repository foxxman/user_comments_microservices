import { InternalServerErrorException } from '@nestjs/common';
import { CommentsExceptions, UsersExceptions } from 'common';

import {
  CommentNotFoundException,
  UserNotCommentOwnerException,
} from './comments';
import {
  PasswordInvalidException,
  RefreshNotFoundException,
  RefreshTokenInvalidException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from './users';

type Constructor = { new (...args: any[]): any };

const usersMap: { [key: string]: Constructor } = {
  [UsersExceptions.UserNotFound]: UserNotFoundException,
  [UsersExceptions.UserAlreadyExists]: UserAlreadyExistsException,
  [UsersExceptions.PasswordInvalid]: PasswordInvalidException,
  [UsersExceptions.RefreshTokenInvalid]: RefreshTokenInvalidException,
  [UsersExceptions.RefreshNotFound]: RefreshNotFoundException,
  [UsersExceptions.TokenInvalid]: RefreshNotFoundException,
  [UsersExceptions.AvatarNotFound]: RefreshNotFoundException,
};

const commentsMap: { [key: string]: Constructor } = {
  [CommentsExceptions.CommentNotFound]: CommentNotFoundException,
  [CommentsExceptions.UserNotCommentOwner]: UserNotCommentOwnerException,
};

export const classes: { [key: string]: Constructor } = {
  ...usersMap,
  ...commentsMap,
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
