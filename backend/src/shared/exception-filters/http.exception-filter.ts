import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from '@modules/logger/logger.service';
import { ErrorAppResponse } from '@shared/types/error-app-response.class';
import { ResponseError } from '@shared/types/response-error.class';
import { ResponseErrorCode } from '@shared/enums/response-error-code.enum';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: AppLogger
  ) {}

  public catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionStatus = exception.getStatus();
    const logErrorMsg = `${exception.message} {${request.method}, ${request.url}}`;

    this.logger.setContext(exception.name);
    this.logger.error(logErrorMsg);

    const errors: ResponseError[] = [];

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        errors.push({
          message: exceptionResponse,
          code: ResponseErrorCode.BAD_REQUEST,
        });
      } else if (Array.isArray(exceptionResponse['message'])) {
        errors.push(
          ...exceptionResponse['message'].map((record: Record<string, string>) => {

            const message = Object.keys(record).reduce<string[]>((acc, key) => {
              acc.push(`Key: "${key}", Message: "${record[key]}"`)

              return acc;
            }, []).join('; ');

            return {
              message,
              code:  ResponseErrorCode.BAD_REQUEST,
            };
          })
        )
      }
    } else {
      errors.push({
        message: exception.message,
        code: ResponseErrorCode.UNKNOWN,
      });
    }

    const errorAppResponse: ErrorAppResponse = {
      isSuccess: false,
      path: request.url,
      errors
    };

    response.status(exceptionStatus).json(errorAppResponse);
  }
}
