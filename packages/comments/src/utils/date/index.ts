import { DeleteAfterEnum } from 'common';
import { addDays, addHours, addWeeks } from 'date-fns';

export function addTimeToCurrentDate(deleteAfter: DeleteAfterEnum): Date {
  const currentTime = new Date();

  switch (deleteAfter) {
    case DeleteAfterEnum.HOUR:
      return addHours(currentTime, 1);
    case DeleteAfterEnum.DAY:
      return addDays(currentTime, 1);
    case DeleteAfterEnum.WEEK:
      return addWeeks(currentTime, 1);
    default:
      return currentTime;
  }
}
