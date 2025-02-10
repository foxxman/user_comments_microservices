import { Observable } from "rxjs";
import { ICreateUserDTO, ILoginResponse } from "../types";

export interface IUsersService {
  createUser(data: ICreateUserDTO): Observable<ILoginResponse>;
}
