import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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
}
