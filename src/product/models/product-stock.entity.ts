import { Cart } from 'src/cart/models/cart.entity';
import { OrderItem } from 'src/order/models/order-item.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @OneToMany(() => Cart, cart => cart.productStock)
  carts: Cart[]

  @OneToMany(() => OrderItem, orderItem => orderItem.productStock)
  orderItems: OrderItem[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
