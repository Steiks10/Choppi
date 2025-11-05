import { AddStoreProductDTO, StoreListResponse, StoreProductsListResponse, StoreResponse, UpdateStoreDTO } from '../dto/store.dto';
import { CreateStoreDTO, UpdateStoreProductDTO } from '../dto/store.dto';

export abstract class StoreRepository {
  // Stores
  abstract findAll(page: number, limit: number, q?: string): Promise<StoreListResponse>;
  abstract findById(id: string): Promise<StoreResponse>;
  abstract create(data: CreateStoreDTO): Promise<StoreResponse>;
  abstract update(id: string, data: UpdateStoreDTO): Promise<StoreResponse>;
  abstract delete(id: string): Promise<void>;

  // Store Products
  abstract addProduct(storeId: string, data: AddStoreProductDTO): Promise<StoreProductResponse>;
  abstract listProducts(storeId: string, page: number, limit: number, q?: string, inStock?: boolean): Promise<StoreProductsListResponse>;
  abstract updateStoreProduct(storeId: string, storeProductId: string, data: UpdateStoreProductDTO): Promise<StoreProductResponse>;
  abstract deleteStoreProduct(storeId: string, storeProductId: string): Promise<void>;
}

export interface StoreProductResponse {
  id: string;
  productId: string;
  price: number;
  stock: number;
}
