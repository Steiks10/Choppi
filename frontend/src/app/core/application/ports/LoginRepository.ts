// src/core/ports/LoginRepository.ts

import { loginDTO, loginResponse } from "@/src/models/dtos/LoginDtos";

export interface LoginRepository {
  login(data: loginDTO): Promise<loginResponse>;
}
