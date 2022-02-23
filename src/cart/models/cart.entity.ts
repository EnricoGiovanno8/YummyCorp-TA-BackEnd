import { ProductStock } from 'src/product/models/product-stock.entity';
import { Product } from 'src/product/models/product.entity';
import { Size } from 'src/product/models/size.entity';
import { User } from 'src/user/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;

  @ManyToOne(() => ProductStock, (productStock) => productStock.carts)
  productStock: ProductStock;

  @ManyToOne(() => Size, (size) => size.carts)
  size: Size;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
