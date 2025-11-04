import { CreateUserDTO, CreateUserResponse, DeleteUserResponse } from '../dto/user.dto';

export abstract class UserRepository {
  abstract create(data: CreateUserDTO): Promise<CreateUserResponse>;
  abstract delete(id: string): Promise<DeleteUserResponse>;
}
