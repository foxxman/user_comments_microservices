import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUser(data: { username: string; password: string }) {
    return { id: '123', username: data.username };
  }
}
