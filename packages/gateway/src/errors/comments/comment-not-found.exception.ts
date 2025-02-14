import { NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CommentsExceptions } from 'common';

export class CommentNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message ?? CommentsExceptions.CommentNotFound);
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
