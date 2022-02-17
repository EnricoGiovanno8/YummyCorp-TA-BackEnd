import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity('product-stocks')
export class ProductStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  stock: number

  // @Column()
  // productId: number // product entity many to one

  // @Column()
  // sizeId: number// size entity many to one

  @ManyToOne(() => Product, product => product.productStocks)
  product: Product

  @ManyToOne(() => Size, size => size.productStocks)
  size: Size
}
