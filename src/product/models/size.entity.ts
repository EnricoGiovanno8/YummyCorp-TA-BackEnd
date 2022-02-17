import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStock } from './product-stock.entity';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductStock, (productStock) => productStock.size)
  productStocks: ProductStock[];
}
