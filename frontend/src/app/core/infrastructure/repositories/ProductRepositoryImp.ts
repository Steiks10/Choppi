import { ProductRepository } from "@/src/app/core/application/ports/ProductRepository";
import { CreateProductDTO, ProductResponse } from "@/src/models/dtos/ProductDtos";

export class ConcreteProductRepository implements ProductRepository {
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

  async create(dto: CreateProductDTO): Promise<ProductResponse> {
    const res = await fetch(`${this.baseUrl()}/products`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(dto),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json as any)?.message || `Error creating product: ${res.status}`);
    return json as ProductResponse;
  }
}
