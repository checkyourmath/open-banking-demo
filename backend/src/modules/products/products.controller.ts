import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDto } from '@modules/products/dtos/product-create.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  create(
    @Body() createProductDto: ProductCreateDto
  ) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // @Get(':id')
  // findOne(
  //   @Param('id') id: string
  // ) {
  //   return this.productService.findOne(id);
  // }
  //
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: UpdateProductDto
  // ) {
  //   return this.productService.update(id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(
  //   @Param('id') id: string
  // ) {
  //   return this.productService.remove(id);
  // }
}
