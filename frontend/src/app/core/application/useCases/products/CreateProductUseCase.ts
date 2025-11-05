import { CreateProductDTO, ProductResponse } from "@/src/models/dtos/ProductDtos";

export interface CreateProductUseCase {
  createProduct(dto: CreateProductDTO): Promise<ProductResponse>;
}
