import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCreateDto } from '@modules/products/dtos/product-create.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  create(createProductDto: ProductCreateDto): Promise<Product> {
    const imageBase64 = createProductDto.file.buffer.toString('base64');
    const image = `data:${createProductDto.file.mimetype};base64,${imageBase64}`;

    return this.productModel.create({
      ...createProductDto,
      image,
    });
  }

  async getProductsMapByIds(productIds: string[]): Promise<Map<string, Product>> {
    const products = await this.productModel.findAll({
      where: {
        id: productIds,
      }
    });

    return new Map<string, Product>(products.map(product => [ product.id, product ]));
  }

  findAll(): Promise<Product[]> {
    return this.productModel.findAll();
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
