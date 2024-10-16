import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { map, Observable, tap } from 'rxjs';
import { AppLogger } from '@modules/logger/logger.service';
import { SuccessAppResponse } from '@shared/types/success-app-response.class';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: AppLogger
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessAppResponse<unknown>> {
    const request = context.switchToHttp().getRequest<Request>();
    const handlerName = context.getHandler().name;

    this.logger.setContext(context.getClass().name);
    this.logger.log(`${handlerName} started`);

    return next.handle().pipe(
      map((data: unknown) => ({
        isSuccess: true,
        data,
        path: request.url,
      })),
      tap(() => this.logger.log(`${handlerName} succeeded`)),
    );
  }
}
