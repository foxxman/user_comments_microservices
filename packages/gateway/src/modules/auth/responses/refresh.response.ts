import { ApiProperty } from '@nestjs/swagger';
import { IRefreshResponse } from 'common';

import { TokenPairResponse } from './token-pair.response';
import { UserResponse } from './user.response';

export class RefreshResponse implements IRefreshResponse {
  @ApiProperty({
    description: 'Field with user',
  })
  user: UserResponse;

  @ApiProperty({
    description: 'Token pair (JWT + Refresh)',
  })
  tokens: TokenPairResponse;
}
