import { ApiProperty } from '@nestjs/swagger';
import { ResponseErrorCode } from '@shared/enums/response-error-code.enum';

export class ResponseError {

  @ApiProperty({ type: String, required: true })
  public message: string;

  @ApiProperty({ enum: ResponseErrorCode, required: true })
  public code: ResponseErrorCode;

}
