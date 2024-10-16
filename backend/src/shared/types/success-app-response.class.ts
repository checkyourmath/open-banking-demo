import { AppResponse } from '@shared/types/app-response.class';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessAppResponse<T = void> extends AppResponse {
  @ApiProperty({ type: Boolean, required: true })
  isSuccess: boolean;

  @ApiProperty()
  data: T;
}
