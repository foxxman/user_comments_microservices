import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthorizedRequest } from '@custom-types/auth';

import { UserIsNotAdminException } from '@errors/users';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest() as AuthorizedRequest;

    if (!user.isAdmin) {
      throw new UserIsNotAdminException();
    }

    return user.isAdmin;
  }
}
