import { PaymentLinkStatus } from '../enums/payment-link-status.enum';
import { Currency } from '../enums/currency.enum';
import { SchemeId } from '../enums/scheme-id.enum';

export type GetPaymentLinkStatusResponse = {
  id: string;
  authorizationUrl: string;
  status: PaymentLinkStatus;
  expiryDate: string;
  paymentAttempts?: string[];
  "paymentRequest": {
    amount: number;
    currency: Currency;
    reference: string;
    receiveDate: null | string,
    schemeId: SchemeId
  }
};
