import { UserRole } from "@/src/models/User";

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: UserRole; // backend por defecto 'comprador'
}
