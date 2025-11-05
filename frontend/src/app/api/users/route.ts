import { NextResponse } from "next/server";
import { UserController } from "@/src/app/core/infrastructure/controllers/UserController";
import { UserService } from "@/src/app/core/application/UserService";
import { ConcreteUserRepository } from "@/src/app/core/infrastructure/repositories/UserRepositoryImp";

const userRepository = new ConcreteUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await userController.handleCreate(body);
    return NextResponse.json(response, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    const status = message === "Missing required fields" ? 400 : 500;
    return NextResponse.json({ message }, { status });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed. Use POST." }, { status: 405 });
}
