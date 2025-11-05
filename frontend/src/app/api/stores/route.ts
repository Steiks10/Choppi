import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { StoreController } from "@/src/app/core/infrastructure/controllers/StoreController";
import { StoreService } from "@/src/app/core/application/StoreService";
import { ConcreteStoreRepository } from "@/src/app/core/infrastructure/repositories/StoreRepositoryImp";

async function buildControllerWithToken() {
  const token = (await cookies()).get("session")?.value;
  const repository = new ConcreteStoreRepository(token);
  const service = new StoreService(repository);
  return new StoreController(service);
}

export async function GET(req: Request) {
  try {
    console.log("ENTRA AL ROUTE GET")
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    console.log("SESSION", session)
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const controller = buildControllerWithToken();
    const response = await (await controller).handleList({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      q: searchParams.get("q") ?? undefined,
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const controller = buildControllerWithToken();
    const response = await (await controller).handleCreate(body);
    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    const status = message === "Missing required fields" ? 400 : 500;
    return NextResponse.json({ message }, { status });
  }
}
