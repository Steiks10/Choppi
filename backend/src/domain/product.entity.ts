import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { StoreProduct } from './store-product.entity';

const numberTransformer = {
  to: (value?: number) => (value ?? null),
  from: (value?: string) => (value != null ? parseFloat(value) : null),
};

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, transformer: numberTransformer })
  price: number;

  @Column()
  category: string;

  @OneToMany(() => StoreProduct, (sp: StoreProduct) => sp.product)
  storeProducts: StoreProduct[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
