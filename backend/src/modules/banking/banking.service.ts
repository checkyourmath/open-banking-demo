import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { EventType, OpenBankingEUv2Client } from 'open-banking-eu-v2';
import { EnvironmentSettings } from '@shared/types/environment-settings.type';
import { BankingState } from './entities/banking-state.entity';
import { AppLogger } from '@modules/logger/logger.service';
import { BANKING_STATE_PRIMARY_ID } from '@modules/banking/constants';

@Injectable()
export class BankingService implements OnModuleInit {
  private bankingClient?: OpenBankingEUv2Client;

  constructor(
    @InjectModel(BankingState)
    private bankingStateModel: typeof BankingState,
    private configService: ConfigService<EnvironmentSettings>,
    private logger: AppLogger,
  ) {
    this.logger.setContext(BankingService.name);

    void this.initOpenBankingClient();
  }

  async onModuleInit(): Promise<void> {
    await this.initBankingState();
    await this.initOpenBankingClient();
  }

  private async initOpenBankingClient(): Promise<void> {
    const { clientId, clientSecret } = this.configService.get('openBanking', { infer: true });
    const { accessToken, refreshToken } = await this.getBankingState() || {};

    this.bankingClient = new OpenBankingEUv2Client({
      clientId,
      clientSecret,
      accessToken,
      refreshToken
    });

    this.bankingClient.on(EventType.Error, (error) => {
      this.logger.error('Received Banking Client error.', JSON.stringify(error));
    });

    this.bankingClient.on(EventType.NewTokens, async (newTokens) => {
      this.logger.log('Received Banking Client "new tokens" event.');

      await this.updateBankingStateTokens(newTokens);
    });
  }

  async connect(authorizationCode: string): Promise<void> {
    if (!this.bankingClient) {
      throw new InternalServerErrorException('Banking Client is not initialized.');
    }

    try {
      const { accessToken, refreshToken } = await this.bankingClient.authorizationCodeExchange({
        authorizationCode,
        redirectUri: 'http://localhost:3000/api/banking/connect',
      });
      const bankingStatus = await this.getBankingStateOrThrow();

      await bankingStatus.update({
        accessToken,
        refreshToken,
        authorizationCode,
      });
      this.bankingClient.setTokens({ accessToken, refreshToken });

    } catch (error) {
      this.logger.error('Banking Connect error', error);

      throw new InternalServerErrorException('Banking Connect error');
    }
  }

  private async updateBankingStateTokens(newTokens: { accessToken?: string; refreshToken?: string }): Promise<void> {
    const bankingState = await this.getBankingState();

    await bankingState.update({
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    });

    this.logger.log('Banking State tokens updated');
  }

  private async initBankingState(): Promise<BankingState> {
    const [ bankingState ] = await this.bankingStateModel.findOrCreate({
      where: { id: BANKING_STATE_PRIMARY_ID }
    });

    return bankingState;
  }

  private async getBankingState(): Promise<BankingState | null> {
    return this.bankingStateModel.findOne({
      where: { id: BANKING_STATE_PRIMARY_ID }
    });
  }

  private async getBankingStateOrThrow(): Promise<BankingState> {
    const bankingState = await this.getBankingState();

    if (!bankingState) {
      throw new InternalServerErrorException('Banking State does not exists.');
    }

    return bankingState;
  }
}
