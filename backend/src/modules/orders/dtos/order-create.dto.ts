import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class OrderItem {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ type: Number, required: true })
  @IsString()
  @IsNotEmpty()
  quantity: number;
}


export class OrderCreateDto {
  @ApiProperty({ type: OrderItem, isArray: true, required: true })
  @IsArray()
  @IsNotEmpty()
  items: OrderItem[];
}
