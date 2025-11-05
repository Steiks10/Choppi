import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { StoreService } from "@/src/app/core/application/StoreService";
import { ConcreteStoreRepository } from "@/src/app/core/infrastructure/repositories/StoreRepositoryImp";
import { StoreController } from "@/src/app/core/infrastructure/controllers/StoreController";

async function buildController() {
  const token = (await cookies()).get("session")?.value;
  const repo = new ConcreteStoreRepository(token);
  const service = new StoreService(repo);
  return new StoreController(service);
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await ctx.params; // <-- await params
    const { searchParams } = new URL(req.url);
    const controller = await buildController();
    const response = await controller.handleListProducts(id, {
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      q: searchParams.get("q") ?? undefined,
      inStock: searchParams.get("inStock") ?? undefined,
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await ctx.params;
    const body = await req.json();
    const controller = await buildController();
    const response = await controller.handleAddStoreProduct(id, body);

    // Asegurar payload serializable aunque el backend no devuelva cuerpo
    const payload =
      response === undefined || response === null
        ? { ok: true }
        : typeof response === "object"
        ? response
        : { ok: true, data: response };

    return NextResponse.json(payload, { status: 201 });
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    const status = message?.includes("Missing") ? 400 : 500;
    return NextResponse.json({ message }, { status });
  }
}
