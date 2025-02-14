import { ITokenPair } from "../../auth";
import { IUserResponse } from "../users/user.response";

export interface IRefreshResponse {
  user: IUserResponse;
  tokens: ITokenPair;
}
