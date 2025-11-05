import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../domain/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './ports/product.repository';
import { ConcreteProductRepository } from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    { provide: ProductRepository, useClass: ConcreteProductRepository },
  ],
  exports: [ProductService],
})
export class ProductModule {}
