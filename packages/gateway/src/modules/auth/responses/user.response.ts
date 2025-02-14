import { ApiProperty } from '@nestjs/swagger';
import { ExactImplementation, IUserResponse } from 'common';

export class UserResponse
  implements ExactImplementation<UserResponse, IUserResponse>
{
  @ApiProperty({
    description: 'User id',
    example: '123-456-789',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 'foxxxman',
    type: String,
  })
  username: string;

  @ApiProperty({
    example: 'http://localhost:3000/api/users/avatar/123-456-789.png',
    type: String,
  })
  avatarUrl: string | null;

  @ApiProperty({
    example: false,
    type: Boolean,
  })
  isAdmin: boolean;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Date in ISO format',
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
