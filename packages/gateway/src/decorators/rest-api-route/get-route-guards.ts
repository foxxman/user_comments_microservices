import { CanActivate, Type } from '@nestjs/common';

import { GUARD_NAMES } from '@custom-types/guards';

import { guardsMap } from '@constants/guards';

interface Props {
  guardsToUse: GUARD_NAMES[];
}

/**
 * Returns an array of route guards based on the provided guardsToUse array.
 *
 * @param {Props} props - The props object containing the guardsToUse array.
 * @returns {Type<CanActivate>[]} An array of route guards.
 */
export const getRouteGuards = ({ guardsToUse }: Props): Type<CanActivate>[] => {
  return Array.from(new Set(guardsToUse)).map(
    (guardName) => guardsMap[guardName],
  );
};
