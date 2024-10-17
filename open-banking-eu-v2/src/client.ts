import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from './_constants';
import { RefreshAccessTokenResponse } from './_sortme/refresh-access-token-reposne';
import { EventCallbackMap, EventEmitter } from './_utils/event-emitter.class';
import { CodeExchangeResponse } from './_dtos/code-exchange.response';
import { AcceptPayment, Account, Payment } from './entities';
import { EventType } from './enums';
import { CreateAcceptPaymentParams } from './params';

export type ClientOptions = {
  clientId: string;
  clientSecret: string;
  accessToken?: string;
  refreshToken?: string;
};

export class OpenBankingEUv2Client {

  private readonly eventEmitter = new EventEmitter();
  private readonly mainAxiosInstance: AxiosInstance;
  private readonly otherAxiosInstance: AxiosInstance;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private accessToken?: string;
  private refreshToken?: string;

  constructor(options: ClientOptions) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;
    this.mainAxiosInstance = axios.create({ baseURL: BASE_URL });
    this.otherAxiosInstance = axios.create({ baseURL: BASE_URL });

    this.mainAxiosInstance.interceptors.request.use(
      this.handleAxiosRequest.bind(this)
    );
    this.mainAxiosInstance.interceptors.response.use(
      this.handleAxiosResponse.bind(this),
      this.handleAxiosResponseError.bind(this)
    );
  }

  on<T extends EventType>(eventType: T, eventCallback: EventCallbackMap[T]): void {
    this.eventEmitter.on(eventType, eventCallback);
  }

  off<T extends  EventType>(eventType: T, eventCallback: EventCallbackMap[T]): void {
    this.eventEmitter.off(eventType, eventCallback);
  }

  public async authorizationCodeExchange(params: { authorizationCode: string; redirectUri: string; }): Promise<{ accessToken: string; refreshToken: string; }> {
    try {
      const response = await this.otherAxiosInstance.post<CodeExchangeResponse>(
        '/v1/oauth/token',
        {
          redirect_uri: params.redirectUri,
          grant_type: 'authorization_code',
          code: params.authorizationCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: {
            username: this.clientId,
            password: this.clientSecret
          }
        }
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
      }
    } catch (e: AxiosError | unknown) {
      if (e instanceof AxiosError) {
        this.eventEmitter.emit(EventType.Error, {
          message: e.message,
          data: e.response?.data,
        });
      } else {
        this.eventEmitter.emit(EventType.Error, e);
      }

      throw e;
    }
  }

  public setTokens(tokens: { accessToken?: string; refreshToken?: string }): void {
    this._setTokens({ ...tokens, skipEmit: true });
  }

  public async getAccounts(): Promise<Account[]> {
    const response = await this.mainAxiosInstance.get<{ accounts: Account[] }>(
      '/v1/accounts',
    );

    return response.data.accounts;
  }

  public async createAcceptPayment(params: CreateAcceptPaymentParams): Promise<AcceptPayment> {
    const response = await this.otherAxiosInstance.post<AcceptPayment>(
      '/v2/payments/accept',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: this.clientId,
          password: this.clientSecret
        }
      }
    );

    return response.data;
  }

  public async getPayment(paymentId: string): Promise<Payment | null> {
    try {
      const response = await this.otherAxiosInstance.get<Payment>(
        `v2/payments/accept/${paymentId}`,
        {
          auth: {
            username: this.clientId,
            password: this.clientSecret
          }
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.status === 404) {
        return null;
      }

      throw error;
    }
  }

  private _setTokens(params: { accessToken?: string; refreshToken?: string; skipEmit?: boolean }): void {
    this.accessToken = params.accessToken;
    this.refreshToken = params.refreshToken;

    if (!params.skipEmit) {
      this.eventEmitter.emit(EventType.NewTokens, {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken
      });
    }
  }

  private handleAxiosResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleAxiosRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (this.accessToken) {
      config.headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    return config;
  }

  private async handleAxiosResponseError(error: any) {
    const originalRequest = error.config;
    const reject = (error: any) => {
      this.eventEmitter.emit(EventType.Error, error);

      return Promise.reject(error);
    };

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (await this.refreshAccessToken()) {
        return this.mainAxiosInstance(originalRequest);
      } else {
        return reject(error);
      }
    }

    return reject(error);
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await this.mainAxiosInstance.post<RefreshAccessTokenResponse>(
        '/v1/oauth/token',
        {
          grant_type: "refresh_token",
          refresh_token: this.refreshToken,
        },
        {
          auth: {
            username: this.clientId,
            password: this.clientSecret
          }
        }
      );

      const { access_token, refresh_token } = response.data;

      this.setTokens({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    } catch (error) {
      console.error('Error refreshing access token', error);
      // Handle refresh token error (e.g., log out the user)

      return false;
    }

    return true;
  }

  // public async listAccounts(): Promise<Account[]> {
  //   const response = await this.axiosInstance.get<Account[]>(
  //     '/v1/accounts'
  //   );
  //
  //   return response.data;
  // }
  //
  // public async getAccount(accountId: string): Promise<Account> {
  //   const response = await this.axiosInstance.get<Account>(
  //     `/v1/accounts/${accountId}`
  //   );
  //
  //   return response.data;
  // }
  //
  // public async createPaymentLink(params: CreatePaymentLinkParams): Promise<CreatePaymentLinkResponse> {
  //   const response = await this.axiosInstance.post<CreatePaymentLinkResponse>(
  //     `/v2/payments/accept/links`,
  //     params
  //   );
  //
  //   return response.data;
  // }
  //
  // // public async getPaymentLinkStatus(paymentLinkId: string): Promise<GetPaymentLinkStatusResponse> {
  // //
  // // }
}
