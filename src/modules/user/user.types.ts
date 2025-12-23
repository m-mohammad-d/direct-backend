export interface AuthUser {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  avatar: string | null;
}
