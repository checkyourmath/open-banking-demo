import { EnvironmentName } from '@src/shared/enums/environment-name.enum';

export type EnvironmentSettings = {
  port: number;
  environmentName: EnvironmentName;
  openBanking: {
    clientId: string;
    clientSecret: string;
  }
  appBaseUrl: string;
}
