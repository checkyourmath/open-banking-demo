import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { ProductCreateDto } from '@modules/products/dtos/product-create.dto';
import { HttpResponseInterceptor } from '@shared/interceptors/http-response.interceptor';
import { Product } from '@modules/products/entities/product.entity';
import { MAX_IMAGE_FILE_SIZE } from '@modules/products/constants';

@Controller('products')
@UseInterceptors(HttpResponseInterceptor)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createProductDto: ProductCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_IMAGE_FILE_SIZE }),
        ],
        fileIsRequired: true
      }),
    ) file: Express.Multer.File,
  ) {
    return this.productService.create({
      ...createProductDto,
      file
    });
  }

  @Get()
  findAll(): Promise<Product[]> {
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
