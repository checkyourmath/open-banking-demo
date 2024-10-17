import { PaymentStatus } from 'open-banking-eu-v2';
import { ApiProperty } from '@nestjs/swagger';

class PaymentDetails {
  @ApiProperty({ type: String, required: true })
  reason: string;

  @ApiProperty({ type: String, required: true })
  description: string;

  @ApiProperty({ type: String, required: true })
  messageToPayer: string;
}

export class Payment {
  @ApiProperty({ type: String, required: true })
  id: string;

  @ApiProperty({ type: Number, required: true })
  amount: number;

  @ApiProperty({ type: PaymentStatus, enum: PaymentStatus, required: true })
  status: PaymentStatus;

  @ApiProperty({ type: String, required: true })
  createdAt: string;

  @ApiProperty({ type: String, required: true })
  lastUpdated: string;

  @ApiProperty({ type: PaymentDetails, required: true })
  details: PaymentDetails;
}
