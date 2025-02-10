import { UnprocessableEntityException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ValidationException extends UnprocessableEntityException {
  constructor(errors) {
    super(
      errors[Object.keys(errors)[0]]?.message || 'validation-error',
      errors,
    );
  }

  @ApiProperty({
    description: 'String representation of the error',
    example: 'validation-error',
  })
  error: string;

  @ApiProperty({
    description: 'Meta information about the error',
    example: {
      password: {
        type: 'isStrongPassword',
        message: 'password is not strong enough',
      },
    },
  })
  meta: object;
}
