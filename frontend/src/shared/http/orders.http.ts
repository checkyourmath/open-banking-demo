'use client';

import { ApiResponse, CreateOrderDto, Order } from '@shared/interface';
import axios from 'axios';

export async function createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
  const API_BASE_URL = (window as any).config?.apiBaseUrl;
  const response = await axios.post<ApiResponse<Order>>(
    `${API_BASE_URL}/orders`,
    createOrderDto
  );

  return response.data.data;
}
