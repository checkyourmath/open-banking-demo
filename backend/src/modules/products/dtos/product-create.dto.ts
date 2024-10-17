import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Product } from '@modules/products/entities/product.entity';

export class ProductCreateDto extends OmitType(Product, ['id', 'image']) {
  @ApiProperty({ type: String, format: 'binary', required: true })
  file: Express.Multer.File;
}
