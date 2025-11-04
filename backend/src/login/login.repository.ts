// src/infrastructure/repositories/ConcreteLoginRepository.ts

import { LoginRepository } from './ports/login.repository';
import { loginDTO, loginResponse } from './dto/login.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConcreteLoginRepository implements LoginRepository {
  async login(data: loginDTO): Promise<loginResponse> {
    const mockResponse = {
      token: 'mock-token-123'
    } as unknown as loginResponse;

    return mockResponse;
  }
}