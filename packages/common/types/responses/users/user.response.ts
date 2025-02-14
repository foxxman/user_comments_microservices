export interface IUserResponse {
  id: string;
  username: string;
  avatarUrl: string | null;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
