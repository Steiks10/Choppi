import { UserService } from "@/src/app/core/application/UserService";
import { createUserDTO, UserRole } from "@/src/models/dtos/UserDtos";

export class UserController {
  constructor(private userService: UserService) {}

  async handleCreate(body: any) {
    const payload: createUserDTO = {
      email: String(body?.email || ""),
      name: String(body?.name || ""),
      password: String(body?.password || ""),
      role: (body?.role as UserRole) || UserRole.comprador,
    };

    if (!payload.email || !payload.name || !payload.password) {
      throw new Error("Missing required fields");
    }

    return this.userService.createUser(payload);
  }
}
