import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { RepositoryModule } from '@modules/repository/repository.module';
import { UsersModule } from '@modules/users/users.module';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
      }),
      inject: [ConfigService],
    }),
    RepositoryModule,
  ],
  providers: [AuthService, TokenService],
  exports: [TokenService, AuthService],
})
export class AuthModule {}
