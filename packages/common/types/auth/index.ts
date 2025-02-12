export interface IToken {
  token: string;
  expireAt: string;
}

export interface ITokenPair {
  token: IToken;
  refresh: IToken;
}

export interface IJwtPayload {
  pairId: string;
  user: {
    id: string;
  };
}

export interface IRefreshJwtPayload {
  pairId: string;
}
