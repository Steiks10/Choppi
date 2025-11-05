import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Store } from './store.entity';
import { Product } from './product.entity';

const numberTransformer = {
  to: (value?: number) => (value ?? null),
  from: (value?: string) => (value != null ? parseFloat(value) : null),
};

@Entity('store_products')
@Unique(['store', 'product'])
export class StoreProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Store, (store) => store.products, { onDelete: 'CASCADE' })
  store: Store;

  @ManyToOne(() => Product, (product) => product.storeProducts, { onDelete: 'CASCADE' })
  product: Product;

  @Column({ type: 'decimal', precision: 12, scale: 2, transformer: numberTransformer })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
