import { ApiProperty } from '@nestjs/swagger';
import { ExactImplementation, ICommentResponse } from 'common';

export class CommentResponse
  implements ExactImplementation<ICommentResponse, CommentResponse>
{
  @ApiProperty({
    example: '6ee4f4a6-b544-40b0-8c01-fee2c8af3aed',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 'Hi there!',
    type: String,
  })
  text: string;

  @ApiProperty({
    example: '6ee4f4a6-b544-40b0-8c01-fee2c8af3aed',
    type: String,
  })
  userId: string;

  @ApiProperty({
    description: 'Date in ISO format',
    example: new Date().toISOString(),
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    description: 'Date in ISO format',
    example: new Date().toISOString(),
    type: String,
  })
  updatedAt: string;
}
