import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ExactImplementation, ILoginDTO } from 'common';

export class LoginDto implements ExactImplementation<LoginDto, ILoginDTO> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Username',
    example: 'foxxxman',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Password',
    example: 'foxxxman',
  })
  password: string;
}
