import { loginDTO, loginResponse } from "@/src/app/core/domain/dtos/LoginDtos";

export interface loginUseCase {
  login(data: loginDTO): Promise<loginResponse>;
}


