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

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string; storeProductId: string }> }) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id, storeProductId } = await ctx.params;
    const controller = await buildController();
    await controller.handleDeleteStoreProduct(id, storeProductId);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    const message = error?.message || "Internal Server Error";
    const status = message === "Missing required ids" ? 400 : 500;
    return NextResponse.json({ message }, { status });
  }
}
