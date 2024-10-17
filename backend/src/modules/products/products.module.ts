import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from '@modules/logger/logger.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    LoggerModule,
  ],
  controllers: [
    ProductsController
  ],
  providers: [
    ProductsService
  ],
})
export class ProductsModule {}
