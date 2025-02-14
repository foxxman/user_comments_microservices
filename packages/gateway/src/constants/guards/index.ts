import { CanActivate, Type } from '@nestjs/common';

import { GUARD_NAMES } from '@custom-types/guards';

import { AdminGuard } from '@guards/admin.guard';
import { AuthGuard } from '@guards/auth.guard';

export type GuardType = Type<CanActivate>;

export const guardsMap: Record<GUARD_NAMES, GuardType> = {
  [GUARD_NAMES.AUTH]: AuthGuard,
  [GUARD_NAMES.ADMIN]: AdminGuard,
};
