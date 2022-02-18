import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity('product-stocks')
export class ProductStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  // @Column()
  // productId: number // product entity many to one

  // @Column()
  // sizeId: number// size entity many to one

  @ManyToOne(() => Product, (product) => product.productStocks, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Size, (size) => size.productStocks, {
    onDelete: 'CASCADE',
  })
  size: Size;
}
