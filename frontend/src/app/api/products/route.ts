import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ProductService } from "@/src/app/core/application/ProductService";
import { ConcreteProductRepository } from "@/src/app/core/infrastructure/repositories/ProductRepositoryImp";
import { ProductController } from "@/src/app/core/infrastructure/controllers/ProductController";

async function buildController() {
  const token = (await cookies()).get("session")?.value;
  const repo = new ConcreteProductRepository(token);
  const service = new ProductService(repo);
  return new ProductController(service);
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const controller = await buildController();
    const response = await controller.handleCreate(body);
    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    const status = message === "Missing or invalid fields" ? 400 : 500;
    return NextResponse.json({ message }, { status });
  }
}
