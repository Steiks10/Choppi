export interface StoreDTO {
  id: string;
  name: string;
  ubication: string;
  description: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date | null;
}

export interface CreateStoreDTO {
  name: string;
  ubication: string;
  description?: string | null;
}

export interface StoreListResponse {
  data?: StoreDTO[];
  items?: StoreDTO[];
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
}

export interface StoreResponse {
  data?: StoreDTO;
  message?: string;
}

export interface StoreProductItem {
  id: string;         // id del store_products
  productId: string;  // id del producto
  price: number;
  stock: number;
  name: string;
  description?: string;
  category: string;
}

export interface StoreProductsListResponse {
  items: StoreProductItem[];
  total: number;
  page: number;
  limit: number;
}
