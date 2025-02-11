import { ITokenPair } from "../auth";
import { IUserResponse } from "./user.response";

export interface ILoginResponse {
  user: IUserResponse;
  tokenPair: ITokenPair;
}
