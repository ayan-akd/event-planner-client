export type TLoggedInUser = {
  userId: string;
  email: string;
  profileImage?: string;
  role: string;
  iat: number;
  exp: number;
};

// User Interface
export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  role?: TUserRole;
  status?: TUserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type TUserRole = "USER" | "ADMIN";
export type TUserStatus = "ACTIVE" | "BLOCKED";
