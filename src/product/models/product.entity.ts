import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStock } from './product-stock.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  gender: 'Men' | 'Women';

  @Column()
  price: number;

  @OneToMany(() => ProductStock, (productStock) => productStock.product, {
    cascade: true,
  })
  stock: ProductStock[];
}
