import { Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { AcceptPayment, CreateAcceptPaymentParams, EventType, OpenBankingEUv2Client, Payment as BankingPayment } from 'open-banking-eu-v2';
import { EnvironmentSettings } from '@shared/types/environment-settings.type';
import { BankingState } from './entities/banking-state.entity';
import { AppLogger } from '@modules/logger/logger.service';
import { BANKING_STATE_PRIMARY_ID } from '@modules/banking/constants';
import { Payment } from '@modules/banking/entities/payment.entity';

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

  async getDestinationId(): Promise<string> {
    if (!this.bankingClient) {
      throw new InternalServerErrorException('Banking Client is not initialized.');
    }

    const accounts = await this.bankingClient.getAccounts();
    const account = accounts.find(a => !!a.destinationId);

    if (!account) {
      throw new InternalServerErrorException('Account not found');
    }

    return account.destinationId;
  }

  public async createAcceptPayment(params: CreateAcceptPaymentParams): Promise<AcceptPayment> {
    if (!this.bankingClient) {
      throw new InternalServerErrorException('Banking Client is not initialized.');
    }

    return this.bankingClient.createAcceptPayment(params);
  }

  async getPayment(paymentId: string): Promise<Payment> {
    if (!this.bankingClient) {
      throw new InternalServerErrorException('Banking Client is not initialized.');
    }

    let bankingPayment: BankingPayment | null = null;

    try {
      bankingPayment = await this.bankingClient.getPayment(paymentId);
    } catch {
      throw new InternalServerErrorException('Cannot get Payment');
    }

    if (!bankingPayment) {
      throw new NotFoundException(`Payment ${paymentId} not found.`);
    }

    const payment: Payment = {
      id: bankingPayment.id,
      amount: bankingPayment.amount,
      status: bankingPayment.status.code,
      createdAt: bankingPayment.createdAt,
      lastUpdated: bankingPayment.status.lastUpdated,
      details: bankingPayment.status.details,
    };

    return payment;
  }

  private async initOpenBankingClient(): Promise<void> {
    const { clientId, clientSecret } = this.configService.getOrThrow('openBanking', { infer: true });
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

  private async updateBankingStateTokens(newTokens: { accessToken?: string; refreshToken?: string }): Promise<void> {
    const bankingState = await this.getBankingState();

    if (!bankingState) {
      throw new InternalServerErrorException('Banking State is not initialized.');
    }

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
