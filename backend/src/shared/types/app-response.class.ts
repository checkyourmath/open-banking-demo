import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ResponseError } from '@shared/types/response-error.class';

export class AppResponse {

  @ApiProperty({ enum: HttpStatus, required: true })
  public status: HttpStatus;

  @ApiProperty({ type: Boolean, required: true })
  public isSuccess: boolean;

  @ApiProperty({ type: String, required: true })
  public path: string;

  @ApiProperty({ type: ResponseError, isArray: true, required: false })
  public errors?: ResponseError[];

}
