// src/interface/controllers/LoginController.ts

import { NextResponse } from "next/server";
import { LoginController } from "@/src/app/core/infrastructure/controllers/LoginController";
import { LoginService } from "@/src/app/core/application/LoginService";
import { ConcreteLoginRepository } from "@/src/app/core/infrastructure/repositories/LoginRepositoryImp";

const loginRepository = new ConcreteLoginRepository();
const loginService = new LoginService(loginRepository);
const loginController = new LoginController(loginService);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    if (searchParams.get("logout") === "1") {
      const res = NextResponse.redirect(new URL("/", req.url));
      res.cookies.set("session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0),
      });
      return res;
    }
    return NextResponse.json({ message: "Method Not Allowed. Use POST." }, { status: 405 });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log("logie");

    // Parsear el cuerpo de la solicitud
    const body = await req.json();

    // Llamar al controlador de login
    const response = await loginController.handleLogin(body);

    // Setear cookie de sesión con el token (si viene en response)
    const res = NextResponse.json(response, { status: 200 });
    const token = (response as any)?.data?.token ?? (response as any)?.token;
    if (token) {
      res.cookies.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });
    }
    return res;
  } catch (error) {
    console.error("Error en POST /api/login:", error);

    // Devolver una respuesta de error
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
