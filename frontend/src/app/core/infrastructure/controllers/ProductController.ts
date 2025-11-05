import { ProductService } from "@/src/app/core/application/ProductService";
import { CreateProductDTO } from "@/src/models/dtos/ProductDtos";

export class ProductController {
  constructor(private productService: ProductService) {}

  async handleCreate(body: any) {
    const dto: CreateProductDTO = {
      name: String(body?.name || ""),
      description: body?.description ?? null,
      price: Number(body?.price),
      category: String(body?.category || ""),
    };
    if (!dto.name || !dto.category || Number.isNaN(dto.price)) {
      throw new Error("Missing or invalid fields");
    }
    return this.productService.createProduct(dto);
  }
}
