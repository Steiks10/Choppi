export enum UserRole {
  admin = "admin",
  comprador = "comprador",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string | Date;
  updatedAt: string | Date;
}
