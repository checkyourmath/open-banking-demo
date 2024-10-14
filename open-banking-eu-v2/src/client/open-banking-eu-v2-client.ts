import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ClientOptions } from '../types/client-options.type';
import { BASE_URL } from '../constants';
import { Account } from '../types/account.type';
import { RefreshAccessTokenResponse } from '../types/refresh-access-token-reposne';

export class OpenBankingEUv2Client {

  private readonly axiosInstance: AxiosInstance;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private accessToken: string;
  private refreshToken: string;

  constructor(options: ClientOptions) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;
    this.axiosInstance = axios.create({
      baseURL: BASE_URL
    });

    this.axiosInstance.interceptors.request.use(this.handleRequest.bind(this));
    this.axiosInstance.interceptors.response.use(this.handleResponse.bind(this), this.handleError.bind(this));
  }

  public async listAccounts(): Promise<Account[]> {
    const response = await this.axiosInstance.get<Account[]>(
      '/v1/accounts',
      {

      }
    );

    return response.data;
  }

  private setTokens(options: { accessToken: string; refreshToken: string }): void {
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;
  }

  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    config.headers['Authorization'] = `Bearer ${this.accessToken}`;

    return config;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private async handleError (error: any) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await this.refreshAccessToken();

      return this.axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }

  private async refreshAccessToken(): Promise<void> {
    try {
      const response = await axios.post<RefreshAccessTokenResponse>(
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
    }
  }
}
