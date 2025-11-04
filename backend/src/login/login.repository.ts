// src/infrastructure/repositories/ConcreteLoginRepository.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginRepository } from './ports/login.repository';
import { loginDTO, loginResponse } from './dto/login.dto';
import { User } from '../domain/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ConcreteLoginRepository implements LoginRepository {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async login(data: loginDTO): Promise<loginResponse> {
    const user = await this.users.findOne({ where: { email: data.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: user.id, role: user.role };
    const token = await this.jwt.signAsync(payload);
    return { token };
  }
}