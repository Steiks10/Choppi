import { CreateProductDTO, ProductResponse } from '../dto/product.dto';

export abstract class ProductRepository {
  abstract create(data: CreateProductDTO): Promise<ProductResponse>;
  abstract findById(id: string): Promise<ProductResponse>;
}
