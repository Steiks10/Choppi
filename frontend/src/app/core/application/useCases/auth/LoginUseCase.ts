import { loginDTO, loginResponse } from "@/src/models/dtos/LoginDtos";

export interface loginUseCase {
  login(data: loginDTO): Promise<loginResponse>;
}


