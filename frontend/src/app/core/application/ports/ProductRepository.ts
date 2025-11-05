import { CreateProductDTO, ProductResponse } from "@/src/models/dtos/ProductDtos";

export interface ProductRepository {
  create(dto: CreateProductDTO): Promise<ProductResponse>;
}
