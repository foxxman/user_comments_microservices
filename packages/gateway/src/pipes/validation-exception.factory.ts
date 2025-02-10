import { ValidationError } from 'class-validator';

import { ValidationException } from './validation.exception';

interface IError {
  [s: string]: { message: string; type?: string };
}

export function exceptionFactory(
  errors: ValidationError[],
): ValidationException {
  const err: IError = {};
  errors.forEach((e: ValidationError) => {
    const { property }: ValidationError = e;
    if (!e.constraints) {
      err[property] = { message: 'Invalid data' };
      return;
    }

    err[property] = {
      type: Object.keys(e.constraints)[0],
      message: Object.values(e.constraints)[0],
    };
  });

  return new ValidationException(err);
}
