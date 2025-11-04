// src/infrastructure/repositories/ConcreteLoginRepository.ts

import { LoginRepository } from "@/src/app/core/application/ports/LoginRepository";
import { loginDTO, loginResponse } from "@/src/app/core/domain/dtos/LoginDtos";
import { injectable } from "inversify";

@injectable()
export class ConcreteLoginRepository implements LoginRepository {
  private readonly API_URL = "/api/auth/login";

  async login(data: loginDTO): Promise<loginResponse> {
    try {
      const url = process.env.BACKEND_URL as string;
      console.log("LoginRepository: Attempting login for", data.email);
      const response = await fetch(url + `/login`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      });
      const result: loginResponse = await response.json();
      console.log("LoginRepository: Login successful for", result.token);
      return result;
    } catch (error) {
      console.error("LoginRepository: Login failed for", data.email, error);
      throw error;
    }
  }
}