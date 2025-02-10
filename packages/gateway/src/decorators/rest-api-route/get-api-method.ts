import { Delete, Get, Patch, Post, Put } from '@nestjs/common';

import { API_METHODS } from '@constants/decorators';

interface Props {
  method: API_METHODS;
  path?: string;
}

export const getApiMethodDecorator = ({ method, path }: Props): MethodDecorator => {
  const methodsDecorators: Record<API_METHODS, (path?: string | string[]) => MethodDecorator> = {
    [API_METHODS.GET]: Get,
    [API_METHODS.POST]: Post,
    [API_METHODS.DELETE]: Delete,
    [API_METHODS.PUT]: Put,
    [API_METHODS.PATCH]: Patch,
  };

  return methodsDecorators[method](path);
};
