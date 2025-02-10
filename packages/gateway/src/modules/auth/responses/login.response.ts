import { ApiProperty } from '@nestjs/swagger';
import { ExactImplementation, ILoginResponse } from 'common';

import { UserResponse } from './user.response';

export class LoginResponse
  implements ExactImplementation<ILoginResponse, LoginResponse>
{
  @ApiProperty({
    type: UserResponse,
  })
  user: UserResponse;
}
