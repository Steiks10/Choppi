import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../domain/user.entity';

export class CreateUserDTO {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'StrongP@ssw0rd' })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.comprador })
  role: UserRole;
}

export class CreateUserResponse {
  @ApiProperty({ example: 'c9a6b7a8-1234-4bcd-9eef-1234567890ab' })
  id: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ enum: UserRole, example: UserRole.comprador })
  role: UserRole;
}

export class DeleteUserResponse {
  @ApiProperty({ example: true })
  deleted: boolean;
}

export interface UserUseCase {
  create(data: CreateUserDTO): Promise<CreateUserResponse>;
  delete(id: string): Promise<DeleteUserResponse>;
}
