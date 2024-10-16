import { OmitType } from '@nestjs/swagger';
import { Product } from '@modules/products/entities/product.entity';

export class ProductCreateDto extends OmitType(Product, ['id']) {
}
