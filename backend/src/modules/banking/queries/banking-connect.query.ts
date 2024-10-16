import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BankingConnectQuery {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  code: string;
}
