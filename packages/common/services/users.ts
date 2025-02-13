import { Observable } from "rxjs";
import {
  ICreateUserDTO,
  IGetUserByIdDTO,
  ILoginDTO,
  ILoginResponse,
  IRefreshDTO,
  IRefreshResponse,
  IUserResponse,
} from "../types";
import { IUpdateAvatarDTO } from "../types/dtos/users";

export interface IUsersService {
  createUser(data: ICreateUserDTO): Observable<ILoginResponse>;
  loginWithUsernameAndPassword(data: ILoginDTO): Observable<ILoginResponse>;
  refreshAccessToken(data: IRefreshDTO): Observable<IRefreshResponse>;
  getUserById(data: IGetUserByIdDTO): Observable<IUserResponse>;
  updateAvatar(data: IUpdateAvatarDTO): Observable<IUserResponse>;
}
