import { CartItem } from 'src/cart/models/cart-items.entity';
import { OrderItem } from 'src/order/models/order-item.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
