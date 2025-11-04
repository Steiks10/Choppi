// src/interface/controllers/LoginController.ts

import { NextResponse } from "next/server";
import { LoginController } from "@/src/app/core/infrastructure/controllers/LoginController";
import { LoginService } from "@/src/app/core/application/LoginService";
import { ConcreteLoginRepository } from "@/src/app/core/infrastructure/repositories/LoginRepositoryImp";

const loginRepository = new ConcreteLoginRepository();
const loginService = new LoginService(loginRepository);
const loginController = new LoginController(loginService);

export async function POST(req: Request) {
  try {
    console.log("logie");

    // Parsear el cuerpo de la solicitud
    const body = await req.json();

    // Llamar al controlador de login
    const response = await loginController.handleLogin(body);

    // Devolver una respuesta exitosa
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error en POST /api/login:", error);

    // Devolver una respuesta de error
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
