import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { StoreRepository, StoreProductResponse } from './ports/store.repository';
import { AddStoreProductDTO, CreateStoreDTO, StoreListResponse, StoreProductsListResponse, StoreResponse, UpdateStoreDTO, UpdateStoreProductDTO } from './dto/store.dto';
import { Store } from '../domain/store.entity';
import { Product } from '../domain/product.entity';
import { StoreProduct } from '../domain/store-product.entity';

@Injectable()
export class ConcreteStoreRepository implements StoreRepository {
  constructor(
    @InjectRepository(Store) private readonly stores: Repository<Store>,
    @InjectRepository(Product) private readonly products: Repository<Product>,
    @InjectRepository(StoreProduct) private readonly storeProducts: Repository<StoreProduct>,
  ) {}

  // Stores
  async findAll(page = 1, limit = 10, q?: string): Promise<StoreListResponse> {
    const skip = (page - 1) * limit;
    console.log('page', page);
    console.log('limit', limit);
    console.log('q', q);

    const where = q ? { name: ILike(`%${q}%`) } : {};
    const [rows, total] = await this.stores.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {
      items: rows.map(s => ({ id: s.id, name: s.name, ubication: s.ubication, description: s.description ?? undefined })),
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<StoreResponse> {
    const s = await this.stores.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Store not found');
    return { id: s.id, name: s.name, ubication: s.ubication, description: s.description ?? undefined };
  }

  async create(data: CreateStoreDTO): Promise<StoreResponse> {
    const saved = await this.stores.save(this.stores.create(data));
    return { id: saved.id, name: saved.name, ubication: saved.ubication, description: saved.description ?? undefined };
  }

  async update(id: string, data: UpdateStoreDTO): Promise<StoreResponse> {
    const s = await this.stores.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Store not found');
    Object.assign(s, data);
    const saved = await this.stores.save(s);
    return { id: saved.id, name: saved.name, ubication: saved.ubication, description: saved.description ?? undefined };
  }

  async delete(id: string): Promise<void> {
    const res = await this.stores.softDelete(id);
    if (!res.affected) throw new NotFoundException('Store not found');
  }

  // Store Products
  async addProduct(storeId: string, data: AddStoreProductDTO): Promise<StoreProductResponse> {
    const store = await this.stores.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');
    const product = await this.products.findOne({ where: { id: data.productId } });
    if (!product) throw new NotFoundException('Product not found');

    const sp = await this.storeProducts.save(this.storeProducts.create({ store, product, price: data.price, stock: data.stock }));
    return { id: sp.id, productId: product.id, price: sp.price, stock: sp.stock };
  }

  async listProducts(storeId: string, page = 1, limit = 10, q?: string, inStock?: boolean): Promise<StoreProductsListResponse> {
    const skip = (page - 1) * limit;
    const qb = this.storeProducts.createQueryBuilder('sp')
      .leftJoinAndSelect('sp.product', 'p')
      .where('sp.storeId = :storeId', { storeId });

    if (q) qb.andWhere('p.name ILIKE :q', { q: `%${q}%` });
    if (inStock === true) qb.andWhere('sp.stock > 0');

    const [rows, total] = await qb
      .orderBy('sp.updatedAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      items: rows.map(sp => ({ id: sp.id, productId: sp.product.id, price: sp.price, stock: sp.stock, name: sp.product.name, description: sp.product.description ?? undefined, category: sp.product.category })),
      total,
      page,
      limit,
    };
  }

  async updateStoreProduct(storeId: string, storeProductId: string, data: UpdateStoreProductDTO): Promise<StoreProductResponse> {
    const sp = await this.storeProducts.findOne({ where: { id: storeProductId }, relations: ['store', 'product'] });
    if (!sp || sp.store.id !== storeId) throw new NotFoundException('Store product not found');
    Object.assign(sp, data);
    const saved = await this.storeProducts.save(sp);
    return { id: saved.id, productId: saved.product.id, price: saved.price, stock: saved.stock };
  }

  async deleteStoreProduct(storeId: string, storeProductId: string): Promise<void> {
    const sp = await this.storeProducts.findOne({ where: { id: storeProductId }, relations: ['store'] });
    if (!sp || sp.store.id !== storeId) throw new NotFoundException('Store product not found');
    await this.storeProducts.delete(sp.id);
  }
}
