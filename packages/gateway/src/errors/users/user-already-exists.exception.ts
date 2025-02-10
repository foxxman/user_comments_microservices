import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UsersExceptions } from 'common';

export class UserAlreadyExistsException extends BadRequestException {
  constructor(message?: string) {
    super(message ?? UsersExceptions.UserAlreadyExists);
  }

  @ApiProperty({
    description: 'String representation of the error',
    example: 'user-not-found',
  })
  error: string;

  @ApiProperty({
    description: 'Meta information about the error',
    example: {},
  })
  meta: object;
}
