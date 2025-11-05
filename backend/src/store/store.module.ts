import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '../domain/store.entity';
import { Product } from '../domain/product.entity';
import { StoreProduct } from '../domain/store-product.entity';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { StoreRepository } from './ports/store.repository';
import { ConcreteStoreRepository } from './store.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Product, StoreProduct])],
  controllers: [StoreController],
  providers: [
    StoreService,
    { provide: StoreRepository, useClass: ConcreteStoreRepository },
  ],
  exports: [StoreService],
})
export class StoreModule {}
