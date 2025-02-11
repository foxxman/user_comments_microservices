import { ApiProperty } from '@nestjs/swagger';
import { ExactImplementation, IToken } from 'common';

export class TokenResponse
  implements ExactImplementation<IToken, TokenResponse>
{
  @ApiProperty({
    type: String,
  })
  token: string;

  @ApiProperty({
    type: Number,
    description: 'Unix timestamp',
    example: new Date().toISOString(),
  })
  expireAt: string;
}
