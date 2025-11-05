import { ProductRepository } from "@/src/app/core/application/ports/ProductRepository";
import { CreateProductUseCase } from "@/src/app/core/application/useCases/products/CreateProductUseCase";
import { CreateProductDTO, ProductResponse } from "@/src/models/dtos/ProductDtos";

export class ProductService implements CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(dto: CreateProductDTO): Promise<ProductResponse> {
    return this.productRepository.create(dto);
  }
}
