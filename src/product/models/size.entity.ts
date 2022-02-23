import { CartItem } from 'src/cart/models/cart-items.entity';
import { OrderItem } from 'src/order/models/order-item.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductStock } from './product-stock.entity';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductStock, (productStock) => productStock.size)
  productStocks: ProductStock[];

  @OneToMany(() => CartItem, cartItem => cartItem.size)
  cartItems: CartItem[]

  @OneToMany(() => OrderItem, orderItem => orderItem.size)
  orderItems: OrderItem[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
