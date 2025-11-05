import { StoreRepository } from "@/src/app/core/application/ports/StoreRepository";
import {
  CreateStoreDTO,
  StoreListResponse,
  StoreResponse,
  StoreProductsListResponse,
} from "@/src/models/dtos/StoreDtos";

export class ConcreteStoreRepository implements StoreRepository {
  constructor(private token?: string) {}

  private baseUrl() {
    const url = process.env.BACKEND_URL;
    if (!url) throw new Error("Backend URL not configured");
    return url;
  }

  private headers() {
    return {
      "Content-Type": "application/json",
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };
  }

  async list(page = 1, limit = 10, q?: string): Promise<StoreListResponse> {
    const url = new URL(`${this.baseUrl()}/stores`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    if (q) url.searchParams.set("q", q);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: this.headers(),
      cache: "no-store",
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json as any)?.message || `Error listing stores: ${res.status}`);
    return json as StoreListResponse;
  }

  async create(dto: CreateStoreDTO): Promise<StoreResponse> {
    const res = await fetch(`${this.baseUrl()}/stores`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(dto),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json as any)?.message || `Error creating store: ${res.status}`);
    return json as StoreResponse;
  }

  async listProducts(
    storeId: string,
    page = 1,
    limit = 10,
    q?: string,
    inStock?: boolean
  ): Promise<StoreProductsListResponse> {
    const url = new URL(`${this.baseUrl()}/stores/${storeId}/products`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    if (q) url.searchParams.set("q", q);
    if (typeof inStock === "boolean") url.searchParams.set("inStock", String(inStock));

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: this.headers(),
      cache: "no-store",
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json as any)?.message || `Error listing store products: ${res.status}`);
    return json as StoreProductsListResponse;
  }

  async deleteStoreProduct(storeId: string, storeProductId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl()}/stores/${storeId}/products/${storeProductId}`, {
      method: "DELETE",
      headers: this.headers(),
    });
    console.log("RESSS", res)
    console.log("DELETEEEEEE")

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error((json as any)?.message || `Error deleting store product: ${res.status}`);
    }
  }

  async addProductToStore(
    storeId: string,
    dto: { productId: string; price: number; stock: number }
  ): Promise<unknown> {
    const res = await fetch(`${this.baseUrl()}/stores/${storeId}/products`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(dto),
    });
    console.log("RES", res)
    const json = await res.json().catch(() => ({}));
    console.log("JSON", json)
    if (!res.ok) throw new Error((json as any)?.message || `Error adding product to store: ${res.status}`);
    return json;
  }
}
