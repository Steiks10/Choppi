import { StoreService } from "@/src/app/core/application/StoreService";
import { CreateStoreDTO } from "@/src/models/dtos/StoreDtos";

export class StoreController {
  constructor(private storeService: StoreService) {}

  async handleList(query: { page?: string; limit?: string; q?: string }) {
    const page = parseInt(query.page ?? "1", 10);
    const limit = parseInt(query.limit ?? "10", 10);
    const q = query.q;
    return this.storeService.listStores(page, limit, q);
  }

  async handleCreate(body: any) {
    const dto: CreateStoreDTO = {
      name: String(body?.name || ""),
      ubication: String(body?.ubication || ""),
      description: body?.description ?? null,
    };
    if (!dto.name || !dto.ubication) throw new Error("Missing required fields");
    return this.storeService.createStore(dto);
  }

  async handleListProducts(storeId: string, query: { page?: string; limit?: string; q?: string; inStock?: string }) {
    const page = parseInt(query.page ?? "1", 10);
    const limit = parseInt(query.limit ?? "10", 10);
    const q = query.q;
    const inStock = query.inStock === "true";
    return this.storeService.listStoreProducts(storeId, page, limit, q, inStock);
  }

  async handleDeleteStoreProduct(storeId: string, storeProductId: string) {
    if (!storeId || !storeProductId) throw new Error("Missing required ids");
    return this.storeService.deleteStoreProduct(storeId, storeProductId);
  }

  async handleAddStoreProduct(
    storeId: string,
    body: { productId?: string; price?: number; stock?: number }
  ) {
    const dto = {
      productId: String(body?.productId || ""),
      price: Number(body?.price),
      stock: Number(body?.stock),
    };
    if (!storeId || !dto.productId || Number.isNaN(dto.price) || Number.isNaN(dto.stock)) {
      throw new Error("Missing or invalid fields");
    }
    return this.storeService.addStoreProduct(storeId, dto);
  }
}
