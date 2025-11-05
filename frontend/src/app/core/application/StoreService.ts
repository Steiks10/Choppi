import { StoreRepository } from "@/src/app/core/application/ports/StoreRepository";
import { CreateStoreUseCase } from "@/src/app/core/application/useCases/stores/CreateStoreUseCase";
import { ListStoresUseCase } from "@/src/app/core/application/useCases/stores/ListStoresUseCase";
import { CreateStoreDTO } from "@/src/models/dtos/StoreDtos";
import type { StoreListResponse, StoreResponse, StoreProductsListResponse } from "@/src/models/dtos/StoreDtos";

export class StoreService implements ListStoresUseCase, CreateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async listStores(page?: number, limit?: number, q?: string): Promise<StoreListResponse> {
    return this.storeRepository.list(page, limit, q);
  }

  async createStore(dto: CreateStoreDTO): Promise<StoreResponse> {
    return this.storeRepository.create(dto);
  }

  async listStoreProducts(storeId: string, page?: number, limit?: number, q?: string, inStock?: boolean): Promise<StoreProductsListResponse> {
    return this.storeRepository.listProducts(storeId, page, limit, q, inStock);
  }

  async deleteStoreProduct(storeId: string, storeProductId: string): Promise<void> {
    return this.storeRepository.deleteStoreProduct(storeId, storeProductId);
  }

  async addStoreProduct(storeId: string, dto: { productId: string; price: number; stock: number }): Promise<void> {
    await this.storeRepository.addProductToStore(storeId, dto);
  }
}
