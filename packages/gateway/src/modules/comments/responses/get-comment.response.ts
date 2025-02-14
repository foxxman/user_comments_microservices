import { ApiProperty } from '@nestjs/swagger';
import { ExactImplementation, IGetCommentsResponse } from 'common';

import { CommentResponse } from './comment.response';

export class GetCommentsResponse
  implements ExactImplementation<IGetCommentsResponse, GetCommentsResponse>
{
  @ApiProperty({
    type: Number,
    example: 100,
  })
  total: number;

  @ApiProperty({
    isArray: true,
    type: CommentResponse,
  })
  comments: CommentResponse[];
}
