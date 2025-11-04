import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './ports/user.repository';
import { CreateUserDTO, CreateUserResponse, DeleteUserResponse, UserUseCase } from './dto/user.dto';

@Injectable()
export class UserService implements UserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  create(data: CreateUserDTO): Promise<CreateUserResponse> {
    return this.userRepository.create(data);
  }

  delete(id: string): Promise<DeleteUserResponse> {
    return this.userRepository.delete(id);
  }
}
