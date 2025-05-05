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
  profileImage: string | null;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
