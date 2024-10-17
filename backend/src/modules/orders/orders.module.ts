import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from '@modules/logger/logger.module';
import { BankingModule } from '@modules/banking/banking.module';
import { ProductsModule } from '@modules/products/products.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderProduct } from './entities/order-product.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, OrderProduct]),
    LoggerModule,
    BankingModule,
    ProductsModule,
  ],
  controllers: [
    OrdersController
  ],
  providers: [
    OrdersService
  ],
  exports: [
    OrdersService
  ],
})
export class OrdersModule {}
