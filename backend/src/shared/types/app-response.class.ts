import { ApiProperty } from '@nestjs/swagger';
import { ResponseError } from '@shared/types/response-error.class';

export class AppResponse {

  @ApiProperty({ type: Boolean, required: true })
  isSuccess: boolean;

  @ApiProperty({ type: String, required: true })
  path: string;

  @ApiProperty({ type: ResponseError, isArray: true, required: false })
  errors?: ResponseError[];

}
