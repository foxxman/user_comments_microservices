// import { CanActivate, Type } from '@nestjs/common';
// import { ApiForbiddenResponse } from '@nestjs/swagger';

// import { GUARD_NAMES } from '@custom-types/guards';

// import { UserIsNotAdminException } from '@errors/admin';

// import { AdminGuard } from '@guards/admin.guard';
// import { AuthGuard } from '@guards/auth.guard';

// import { SwaggerTokenExceptions } from '@decorators/swagger';

// export const GuardsSwaggerExceptions: Record<
//   GUARD_NAMES,
//   (MethodDecorator & ClassDecorator)[]
// > = {
//   [GUARD_NAMES.AUTH]: [SwaggerTokenExceptions()],
//   [GUARD_NAMES.ADMIN]: [
//     ApiForbiddenResponse({
//       description: 'User is not admin',
//       type: UserIsNotAdminException,
//     }),
//   ],
// };

// export type GuardType = Type<CanActivate>;

// export const guardsMap: Record<GUARD_NAMES, GuardType> = {
//   [GUARD_NAMES.AUTH]: AuthGuard,
//   [GUARD_NAMES.ADMIN]: AdminGuard,
// };
