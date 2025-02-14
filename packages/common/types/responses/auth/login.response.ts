import { ITokenPair } from "../../auth";
import { IUserResponse } from "../users/user.response";

export interface ILoginResponse {
  user: IUserResponse;
  tokenPair: ITokenPair;
}
