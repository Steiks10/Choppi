import { Store } from "@/src/models/Store";
import { Product } from "@/src/models/Product";

export interface StoreProduct {
  id: string;
  store: Store;
  product: Product;
  price: number;
  stock: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
