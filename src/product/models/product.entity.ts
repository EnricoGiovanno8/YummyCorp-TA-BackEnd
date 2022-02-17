import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStock } from './product-stock.entity';

export enum GenderType {
  Men = 'Men',
  Women = 'Women',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  gender: GenderType;

  @OneToMany(() => ProductStock, (productStock) => productStock.product)
  productStocks: ProductStock[];
}
