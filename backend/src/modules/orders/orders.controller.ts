import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpResponseInterceptor } from '@shared/interceptors/http-response.interceptor';
import { OrderCreateDto } from '@modules/orders/dtos/order-create.dto';
import { OrdersService } from '@modules/orders/orders.service';

@Controller('orders')
@ApiTags('orders')
@UseInterceptors(HttpResponseInterceptor)
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
  ) {
  }

  @Post()
  async createOrder(
    @Body() orderCreateDto: OrderCreateDto,
  ) {
    return this.ordersService.create(orderCreateDto);
  }

}
