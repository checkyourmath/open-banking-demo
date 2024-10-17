import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BankingService } from '@modules/banking/banking.service';
import { ProductsService } from '@modules/products/products.service';
import { OrderCreateDto } from '@modules/orders/dtos/order-create.dto';
import { Order } from '@modules/orders/entities/order.entity';
import { OrderProduct } from '@modules/orders/entities/order-product.entity';

@Injectable()
export class OrdersService {
  constructor(
    bankingService: BankingService,
    productsService: ProductsService,
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(Order)
    private orderProductModel: typeof OrderProduct,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(orderCreateDto: OrderCreateDto): Promise<Order> {

    throw new NotImplementedException();
  }
}
