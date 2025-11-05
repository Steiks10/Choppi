export enum UserRole {
  admin = "admin",
  comprador = "comprador",
}

export interface createUserDTO {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface createdUserData {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface createUserResponse {
  data?: createdUserData;
  message?: string;
}
