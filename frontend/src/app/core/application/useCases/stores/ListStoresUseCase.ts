import { StoreListResponse } from "@/src/models/dtos/StoreDtos";

export interface ListStoresUseCase {
  listStores(page?: number, limit?: number, q?: string): Promise<StoreListResponse>;
}
