import { ProductStock } from 'src/product/models/product-stock.entity';
import { Product } from 'src/product/models/product.entity';
import { Size } from 'src/product/models/size.entity';
import { User } from 'src/user/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
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

  @UpdateDateColumn()
  updatedAt: Date;
}
