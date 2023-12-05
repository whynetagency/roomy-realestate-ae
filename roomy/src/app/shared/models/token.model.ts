export interface IToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export interface ITokenText {
  text: IToken
}
