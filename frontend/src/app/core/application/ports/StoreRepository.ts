import { CreateStoreDTO } from "@/src/models/dtos/StoreDtos";
import type { StoreListResponse, StoreResponse, StoreProductsListResponse } from "@/src/models/dtos/StoreDtos";

export interface StoreRepository {
  list(page?: number, limit?: number, q?: string): Promise<StoreListResponse>;
  create(dto: CreateStoreDTO): Promise<StoreResponse>;
  listProducts(storeId: string, page?: number, limit?: number, q?: string, inStock?: boolean): Promise<StoreProductsListResponse>;
  deleteStoreProduct(storeId: string, storeProductId: string): Promise<void>;
  addProductToStore(storeId: string, dto: { productId: string; price: number; stock: number }): Promise<unknown>;
}
