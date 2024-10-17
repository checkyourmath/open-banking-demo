import { Country, Currency, SchemeId } from '../enums';

export type CreateAcceptPaymentParams = {
  amount: number;
  currency: Currency;
  schemeId: SchemeId;
  reference: string;
  destinationId: string;
  preselectedCountry: Country;
  redirectUrl: string;
}
