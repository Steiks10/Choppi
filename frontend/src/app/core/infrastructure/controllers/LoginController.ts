// src/interface/controllers/LoginController.ts

import { LoginService } from "@/src/app/core/application/LoginService";
import { loginDTO } from '@/src/app/core/domain/dtos/LoginDtos'

export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  async handleLogin(body: loginDTO) {
    try {
      console.log("Entre al handleLogin");
      console.log("Body recibido:", body);

      const { email, password} = body;

      // Llama al servicio de login
      const result = await this.loginService.login(body);
      console.log("THE RESULT", result);

      // Devuelve el resultado
      return { success: true, data: result };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error en handleLogin:", errorMessage);

      // Devuelve un error
      return { success: false, message: "Login failed", error: errorMessage };
    }
  }
}
