import { ApiProperty } from '@nestjs/swagger';
import { ExactImplementation, ITokenPair } from 'common';

import { TokenResponse } from './token.response';

export class TokenPairResponse
  implements ExactImplementation<ITokenPair, TokenPairResponse>
{
  @ApiProperty({
    type: TokenResponse,
    description: 'Access token',
  })
  token: TokenResponse;

  @ApiProperty({
    type: TokenResponse,
    description: 'Refresh token',
  })
  refresh: TokenResponse;
}
