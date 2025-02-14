import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DeleteAfterEnum } from 'common';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(350)
  @ApiProperty({
    description: 'Comment text',
    example: 'Hi there!',
  })
  text: string;

  @IsOptional()
  @IsEnum(DeleteAfterEnum)
  @ApiProperty({
    description: 'Time after which the comment should be deleted',
    example: 'hour',
    enum: DeleteAfterEnum,
    required: false,
  })
  deleteAfter?: DeleteAfterEnum;
}
