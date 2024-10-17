'use client';

import { ApiResponse, Product } from '@shared/interface';
import { getApiBaseUrl } from '@shared/utils/api.utils';
import axios from 'axios';

export async function getProducts(): Promise<Product[]> {
  const response = await axios.get<ApiResponse<Product[]>>(
    `${getApiBaseUrl()}/products`,
  );

  return response.data.data;
}
