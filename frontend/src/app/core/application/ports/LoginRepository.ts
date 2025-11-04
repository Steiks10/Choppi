// src/core/ports/LoginRepository.ts

import { loginDTO, loginResponse } from "@/src/app/core/domain/dtos/LoginDtos";

export interface LoginRepository {
  login(data: loginDTO): Promise<loginResponse>;
}
