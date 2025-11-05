import { createUserDTO, createUserResponse } from "@/src/models/dtos/UserDtos";

export interface UserRepository {
  create(data: createUserDTO): Promise<createUserResponse>;
}
