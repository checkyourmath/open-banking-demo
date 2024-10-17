import { Currency, PaymentStatus, SchemeId } from '../enums';

export type Payment = {
  id: string;
  destinationId: string;
  schemeId: SchemeId;
  amount: number;
  currency: Currency;
  createdAt: string;
  reference: string;
  status: {
    code: PaymentStatus;
    lastUpdated: string;
    details: {
      reason: string;
      description: string;
      messageToPayer: string;
    };
    events: {
      code: PaymentStatus;
      timestamp: string;
    }[]
  };
};
