import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BankingService } from '@modules/banking/banking.service';
import { ProductsService } from '@modules/products/products.service';
import { OrderCreateDto } from '@modules/orders/dtos/order-create.dto';
import { Order } from '@modules/orders/entities/order.entity';
import { OrderProduct } from '@modules/orders/entities/order-product.entity';
import { AcceptPayment, Country, Currency, SchemeId } from 'open-banking-eu-v2';
import { ConfigService } from '@nestjs/config';
import { EnvironmentSettings } from '@shared/types/environment-settings.type';

@Injectable()
export class OrdersService {
  constructor(
    private configService: ConfigService<EnvironmentSettings>,
    private bankingService: BankingService,
    private productsService: ProductsService,
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(OrderProduct)
    private orderProductModel: typeof OrderProduct,
  ) {
  }

  async create(orderCreateDto: OrderCreateDto): Promise<Order> {
    const appBaseUrl = this.configService.getOrThrow('appBaseUrl', { infer: true });
    const { items: orderItems } = orderCreateDto;
    const destinationId = await this.bankingService.getDestinationId();
    const productIds = orderItems.map(orderItem => orderItem.productId);
    const productsById = await this.productsService.getProductsMapByIds(productIds);
    const price = Math.floor(100 * orderItems.reduce<number>((acc, orderItem) => {
      const quantity = Math.floor(orderItem.quantity);

      if (quantity < 1) {
        throw new BadRequestException(`Product with id "${orderItem.productId}" not found.`);
      }

      const product = productsById.get(orderItem.productId);

      if (!product) {
        throw new BadRequestException(`Product with id "${orderItem.productId}" not found.`);
      }

      return acc + product.price * quantity;
    }, 0)) / 100;

    let acceptPayment: AcceptPayment | undefined;

    try {
      acceptPayment = await this.bankingService.createAcceptPayment({
        amount: price,
        currency: Currency.DanishKrone,
        schemeId: SchemeId.DanishDomesticCreditTransfer,
        reference: 'ROMAN01',
        destinationId,
        preselectedCountry: Country.Denmark,
        redirectUrl: `${appBaseUrl}/payment`
      });
    } catch {
      /* log error */
    }

    if (!acceptPayment) {
      throw new InternalServerErrorException('Cannot create AcceptPayment');
    }

    const order: Order = await this.orderModel.create({
      price,
      paymentId: acceptPayment.paymentId,
      paymentLink: acceptPayment.authorizationUrl,
    });

    for (const orderItem of orderItems) {
      await this.orderProductModel.create({
        orderId: order.id,
        productId: orderItem.productId,
        quantity: orderItem.quantity,
      });
    }

    return order;
  }
}
