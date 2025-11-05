import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from './ports/product.repository';
import { CreateProductDTO, ProductResponse } from './dto/product.dto';
import { Product } from '../domain/product.entity';

@Injectable()
export class ConcreteProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async create(data: CreateProductDTO): Promise<ProductResponse> {
    const saved = await this.products.save(this.products.create(data));
    const { id, name, description, price, category } = saved;
    return { id, name, description: description ?? undefined, price, category };
  }

  async findById(id: string): Promise<ProductResponse> {
    const p = await this.products.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Product not found');
    const { name, description, price, category } = p;
    return { id: p.id, name, description: description ?? undefined, price, category };
  }
}
