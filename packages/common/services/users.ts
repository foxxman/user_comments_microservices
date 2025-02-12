import { Observable } from "rxjs";
import { ICreateUserDTO, ILoginDTO, ILoginResponse } from "../types";

export interface IUsersService {
  createUser(data: ICreateUserDTO): Observable<ILoginResponse>;
  loginWithUsernameAndPassword(data: ILoginDTO): Observable<ILoginResponse>;
}
