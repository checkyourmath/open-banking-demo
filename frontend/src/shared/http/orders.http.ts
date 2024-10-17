import { ApiResponse, CreateOrderDto, Order, Payment } from '@shared/interface';
import { getApiBaseUrl } from '@shared/utils/api.utils';
import axios from 'axios';

export async function createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
  const response = await axios.post<ApiResponse<Order>>(
    `${getApiBaseUrl()}/orders`,
    createOrderDto
  );

  return response.data.data;
}
