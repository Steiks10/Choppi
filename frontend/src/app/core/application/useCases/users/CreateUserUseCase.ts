import { createUserDTO, createUserResponse } from "@/src/models/dtos/UserDtos";

export interface createUserUseCase {
  createUser(data: createUserDTO): Promise<createUserResponse>;
}
