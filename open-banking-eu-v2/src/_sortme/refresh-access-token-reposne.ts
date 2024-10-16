export type RefreshAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  redirect_uri: null;
  token_type: 'bearer';
};
