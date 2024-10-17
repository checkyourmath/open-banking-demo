import { ApiResponse, Payment } from '@shared/interface';
import { getApiBaseUrl } from '@shared/utils/api.utils';
import axios, { AxiosError } from 'axios';

export async function getPayment(paymentId: string): Promise<Payment | null> {
  try {
    const response = await axios.get<ApiResponse<Payment>>(
      `${getApiBaseUrl()}/banking/payment/${paymentId}`,
    );

    return response.data.data;
  } catch (e) {
    if (e instanceof AxiosError && e.status === 404) {
      return null;
    }

    throw e;
  }
}
