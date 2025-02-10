import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { DynamicException } from '@errors/exception-map';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.trace('Got an exception', exception);
    if (
      (exception as { type?: string }).type === 'rpc' ||
      (exception as { details?: string }).details
    ) {
      exception = new DynamicException(
        (exception as { details?: string }).details ||
          (exception.message as { details?: string }).details ||
          exception.message,
      );
    }

    const isHttpException: boolean = exception instanceof HttpException;

    const status = isHttpException
      ? (exception as HttpException).getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = isHttpException
      ? {
          error: (exception as HttpException).message,
          meta: (exception as any).options,
        }
      : {
          error: 'Internal Server Error',
        };

    this.logger.error(
      `Error on request: [${request.method}] ${request.path} | Response status: ${status}`,
    );
    if (!isHttpException) {
      exception && this.logger.error((exception as Error).stack);
    }
    response.status(status).json(body);
  }
}
