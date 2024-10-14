import { ConnectScope } from '../enums/connect-scope.enum';

export type ConnectParams = {
  scope: ConnectScope[],
  redirectUrl: string;
};
