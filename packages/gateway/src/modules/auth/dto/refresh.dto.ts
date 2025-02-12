import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IRefreshDTO } from 'common';

export class RefreshDTO implements IRefreshDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Earlier received refresh token',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  refresh: string;
}
