import { EnvironmentName } from '@shared/enums/environment-name.enum';
import { EnvironmentSettings } from '@shared/types/environment-settings.type';

export class ConfigHelper {

  public static getEnvironmentSetting(variableName: string): string {
    const variableValue = process.env[variableName];

    if (!variableValue) {
      throw new Error(`Empty ${variableName}`);
    }

    return variableValue;
  }

  public static isValidEnvironmentName(environmentName: string): environmentName is EnvironmentName {
    return [ 'local' ].includes(environmentName);
  }

  public static getEnvironmentSettings(): EnvironmentSettings {

    const port = parseInt(ConfigHelper.getEnvironmentSetting('PORT'), 10);

    if (isNaN(port)) {
      throw new Error('Port is not a number.');
    }

    const environmentName = ConfigHelper.getEnvironmentSetting('ENVIRONMENT_NAME');

    if (!ConfigHelper.isValidEnvironmentName(environmentName)) {
      throw new Error(`Invalid environment name "${environmentName}".`);
    }

    return {
      port,
      environmentName,
      openBanking: {
        clientId: ConfigHelper.getEnvironmentSetting('OPEN_BANKING_CLIENT_ID'),
        clientSecret: ConfigHelper.getEnvironmentSetting('OPEN_BANKING_CLIENT_SECRET'),
      },
      appBaseUrl: ConfigHelper.getEnvironmentSetting('APP_BASE_URL'),
    }
  }

}
