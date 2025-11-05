import { Inject, Injectable } from '@nestjs/common';
import { StoreRepository } from './ports/store.repository';
import { AddStoreProductDTO, CreateStoreDTO, StoreListResponse, StoreProductsListResponse, StoreResponse, UpdateStoreDTO, UpdateStoreProductDTO } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(
    @Inject(StoreRepository)
    private readonly repo: StoreRepository,
  ) {}

  // Stores
  findAll(page: number, limit: number, q?: string): Promise<StoreListResponse> {
    return this.repo.findAll(page, limit, q);
  }
  findById(id: string): Promise<StoreResponse> {
    return this.repo.findById(id);
  }
  create(data: CreateStoreDTO): Promise<StoreResponse> {
    return this.repo.create(data);
  }
  update(id: string, data: UpdateStoreDTO): Promise<StoreResponse> {
    return this.repo.update(id, data);
  }
  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }

  // Store Products
  addProduct(storeId: string, data: AddStoreProductDTO) {
    return this.repo.addProduct(storeId, data);
  }
  listProducts(storeId: string, page: number, limit: number, q?: string, inStock?: boolean): Promise<StoreProductsListResponse> {
    return this.repo.listProducts(storeId, page, limit, q, inStock);
  }
  updateStoreProduct(storeId: string, storeProductId: string, data: UpdateStoreProductDTO) {
    return this.repo.updateStoreProduct(storeId, storeProductId, data);
  }
  deleteStoreProduct(storeId: string, storeProductId: string) {
    return this.repo.deleteStoreProduct(storeId, storeProductId);
  }
}
