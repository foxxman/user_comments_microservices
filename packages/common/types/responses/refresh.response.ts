import { ITokenPair } from "../auth";
import { IUserResponse } from "./user.response";

export interface IRefreshResponse {
  user: IUserResponse;
  tokens: ITokenPair;
}
