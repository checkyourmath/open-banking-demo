import { ApiProperty } from '@nestjs/swagger';
import { AppResponse } from '@shared/types/app-response.class';
import { ResponseError } from '@shared/types/response-error.class';

export class ErrorAppResponse extends AppResponse {

  @ApiProperty({ type: Boolean, required: true })
  public isSuccess: false;

  @ApiProperty({ type: ResponseError, isArray: true, required: true })
  public errors: ResponseError[];

}
