import { Observable } from "rxjs";
import {
  ICreateUserDTO,
  IGetFileResponse,
  IGetUserByIdDTO,
  ILoginDTO,
  ILoginResponse,
  IRefreshDTO,
  IRefreshResponse,
  IUserResponse,
  IGetFileDTO,
  IUpdateAvatarDTO,
} from "../types";

export interface IUsersService {
  createUser(data: ICreateUserDTO): Observable<ILoginResponse>;
  loginWithUsernameAndPassword(data: ILoginDTO): Observable<ILoginResponse>;
  refreshAccessToken(data: IRefreshDTO): Observable<IRefreshResponse>;
  getUserById(data: IGetUserByIdDTO): Observable<IUserResponse>;
  updateAvatar(data: IUpdateAvatarDTO): Observable<IUserResponse>;
  getFile(request: IGetFileDTO): Observable<IGetFileResponse>;
}
