export class UserModel {
  apiUrl: string;
  userId: number;
  token: string;
  expireDate: Date;
  rememberMe = true;
  fullName: string;
  imageUrl: string;
  starredMembers: string[];
  roles: string[];
}
