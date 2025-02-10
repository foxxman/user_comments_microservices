import { Observable } from "rxjs";

export interface IUsersService {
  createUser(data: {
    username: string;
    password: string;
  }): Observable<{ id: string; username: string }>;
}
