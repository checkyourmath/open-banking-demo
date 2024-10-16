import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCreateDto } from '@modules/products/dtos/product-create.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  create(createProductDto: ProductCreateDto): Promise<Product> {
    return this.productRepository.create(createProductDto);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} product`;
  // }
  //
  // update(id: string, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product with "${JSON.stringify(updateProductDto)}"`;
  // }
  //
  // remove(id: string) {
  //   return `This action removes a #${id} product`;
  // }
}
