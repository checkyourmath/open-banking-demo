'use client';

import { ApiResponse, Product } from '@shared/interface';
import axios from 'axios';

export async function getProducts(): Promise<Product[]> {
  const API_BASE_URL = (window as any).config?.apiBaseUrl;
  const response = await axios.get<ApiResponse<Product[]>>(
    `${API_BASE_URL}/products`,
  );

  return response.data.data;
}
