import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStock } from './product-stock.entity';

export enum ProductGenderType {
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
  gender: ProductGenderType;

  @Column({ default: 'default-image.png' })
  image: string;

  @OneToMany(() => ProductStock, (productStock) => productStock.product)
  productStocks: ProductStock[];
}
