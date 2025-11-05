import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from './ports/product.repository';
import { CreateProductDTO, ProductResponse } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly repo: ProductRepository,
  ) {}

  create(data: CreateProductDTO): Promise<ProductResponse> {
    return this.repo.create(data);
  }

  findById(id: string): Promise<ProductResponse> {
    return this.repo.findById(id);
  }
}
