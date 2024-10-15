import { OmitType } from '@nestjs/swagger';
import { Product } from '@modules/products/entities/product.entity';


export class CreateProductDto extends OmitType(Product, ['id']) {
}
