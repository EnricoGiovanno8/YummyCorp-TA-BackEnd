import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity('product-stock')
export class ProductStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.stock)
  @JoinColumn({name: "productId"})
  product: Product;

  @ManyToOne(() => Size, (size) => size.stock)
  @JoinColumn({name: "sizeId"})
  size: Size;
}
