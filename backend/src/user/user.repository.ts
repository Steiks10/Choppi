import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './ports/user.repository';
import { CreateUserDTO, CreateUserResponse, DeleteUserResponse } from './dto/user.dto';
import { User } from '../domain/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ConcreteUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async create(data: CreateUserDTO): Promise<CreateUserResponse> {
    const exists = await this.users.findOne({ where: { email: data.email } });
    if (exists) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const entity = this.users.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: data.role,
    });
    const saved = await this.users.save(entity);

    return { id: saved.id, email: saved.email, name: saved.name, role: saved.role };
  }

  async delete(id: string): Promise<DeleteUserResponse> {
    const result = await this.users.delete(id);
    if (!result.affected) throw new NotFoundException('User not found');
    return { deleted: true };
  }
}
