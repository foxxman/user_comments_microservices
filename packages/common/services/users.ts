import { Observable } from "rxjs";
import {
  ICreateUserDTO,
  ILoginDTO,
  ILoginResponse,
  IRefreshDTO,
  IRefreshResponse,
} from "../types";

export interface IUsersService {
  createUser(data: ICreateUserDTO): Observable<ILoginResponse>;
  loginWithUsernameAndPassword(data: ILoginDTO): Observable<ILoginResponse>;
  refreshAccessToken(data: IRefreshDTO): Observable<IRefreshResponse>;
}
