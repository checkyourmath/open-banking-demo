import { Currency } from '../enums/currency.enum';
import { SchemeId } from '../enums/scheme-id.enum';

export type CreatePaymentLinkParams = {
  paymentRequest: {
    amount: number;
    currency: Currency;
    schemeId: SchemeId;
    reference: string;
    destinationId: string;
    redirectUrl: string;
    language?: string;
  };
  expiryDate: string;
};
