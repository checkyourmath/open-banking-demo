import { Currency } from '../enums';

export type Account = {
  accountProvider: {
    id: string;
    name: string;
  };
  available: {
    currency: Currency;
    value: number;
  };
  availableBalance: number;
  booked: {
    currency: Currency;
    value: number;
  };
  bookedBalance: number;
  destinationId: string;
  features: {
    paymentFrom: boolean;
    paymentTo: boolean;
    psdPaymentAccount: boolean;
    queryable: boolean;
  };
  id: string;
  isOrphaned: boolean;
  lastSynchronized: Date;
  name: string;
  number: {
    bban: string;
    bbanParsed: {
      accountNumber: string;
      bankCode: string;
    };
    bbanType: string;
    card: null | string;
    iban: string;
  };
  owner: string;
  syncStatus: 'Finished',
  type: 'Consumption',
  verifiedForPayments: boolean;
  groupId: null | string;
  groupName: null | string;
};
