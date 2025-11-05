import { LoginRepository } from "@/src/app/core/application/ports/LoginRepository";
import {
  loginDTO,
  loginResponse
} from "@/src/models/dtos/LoginDtos";
import { loginUseCase } from "@/src/app/core/application/useCases/auth/LoginUseCase";

export class LoginService implements loginUseCase {
  constructor(private loginRepository: LoginRepository) {}

  async login(data: loginDTO): Promise<loginResponse> {
    console.log("entre al login service");
    return this.loginRepository.login(data);
  }
}
