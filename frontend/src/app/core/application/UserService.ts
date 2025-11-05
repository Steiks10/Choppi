import { UserRepository } from "@/src/app/core/application/ports/UserRepository";
import { createUserDTO, createUserResponse } from "@/src/models/dtos/UserDtos";
import { createUserUseCase } from "@/src/app/core/application/useCases/users/CreateUserUseCase";

export class UserService implements createUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: createUserDTO): Promise<createUserResponse> {
    return this.userRepository.create(data);
  }
}
