import {
  HttpCode,
  HttpStatus,
  NestInterceptor,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiResponseMetadata,
} from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { mapDecoratorsList } from '@utils/decorators';

import { DecoratorListSettings } from '@custom-types/decorators';
import { GUARD_NAMES } from '@custom-types/guards';

import { API_METHODS } from '@constants/decorators';

import { getApiMethodDecorator } from './get-api-method';
import { getRouteGuards } from './get-route-guards';

export interface RestApiRouteOptions {
  method: API_METHODS;
  path?: string;
  summary: string;
  response: {
    httpCode: HttpStatus;
    type?: ApiResponseMetadata['type'];
    description: string;
    schema?: SchemaObject & Partial<ReferenceObject>;
  };
  guardsToUse?: GUARD_NAMES[];
  additionalDecorators?: (
    | (MethodDecorator & ClassDecorator)
    | MethodDecorator
  )[];
  addSwaggerBearerAuth?: boolean;
  interceptors?: (NestInterceptor | Function)[];
}

export const RestApiRoute = ({
  method,
  path,
  summary,
  response,
  guardsToUse = [],
  additionalDecorators = [],
  addSwaggerBearerAuth = false,
  interceptors = [],
}: RestApiRouteOptions) => {
  const guardsList = getRouteGuards({
    guardsToUse,
  });

  const decoratorListSettings: DecoratorListSettings[] = [
    {
      include: true,
      decorator: UseGuards(...guardsList),
    },
    {
      include: true,
      decorator: getApiMethodDecorator({ method, path }),
    },
    {
      include: true,
      decorator: ApiOperation({ summary }),
    },
    {
      include: guardsToUse.includes(GUARD_NAMES.AUTH) || addSwaggerBearerAuth,
      decorator: ApiBearerAuth(),
    },
    {
      include: true,
      decorator: HttpCode(response.httpCode),
    },
    {
      include: true,
      decorator: ApiResponse({
        status: response.httpCode,
        description: response.description,
        type: response.type,
        schema: response.schema,
      }),
    },
    {
      include: interceptors.length > 0,
      decorator: UseInterceptors(...interceptors),
    },
  ];

  const res = mapDecoratorsList({ decoratorListSettings });
  return applyDecorators(...res, ...additionalDecorators);
};
