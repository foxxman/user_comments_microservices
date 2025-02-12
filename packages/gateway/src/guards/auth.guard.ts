import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'common';
import { Request } from 'express';

import { AuthorizedRequest } from '@custom-types/auth';

import { TokenInvalidException } from '@errors/users';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthorizedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new TokenInvalidException();
    }

    try {
      const decoded = (await this.jwtService.verifyAsync(token)) as IJwtPayload;
      request.user = decoded.user;
      return true;
    } catch (error) {
      throw new TokenInvalidException();
    }
  }

  private extractToken(request: Request): string | null {
    const header = request.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return null;
    }
    return header.split(' ')[1];
  }
}
