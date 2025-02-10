import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ExactImplementation, ICreateUserDTO } from 'common';

export class CreateUserDto
  implements ExactImplementation<CreateUserDto, ICreateUserDTO>
{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(9)
  @ApiProperty({
    description: 'Username',
    example: 'foxxxman',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    description: 'Password',
    example: 'foxxxman',
  })
  password: string;
}
