import { Injectable, Inject } from '@nestjs/common';
import { loginResponse, loginDTO } from './dto/login.dto';
import { loginUseCase } from './login.use.case';
import { LoginRepository } from './ports/login.repository';

@Injectable()
export class LoginService implements loginUseCase {
  constructor(
    @Inject(LoginRepository)
    private readonly loginRepository: LoginRepository,
  ) {}

  async login(data: loginDTO): Promise<loginResponse> {
    console.log("entre al login service");
    return this.loginRepository.login(data);
  }
}
