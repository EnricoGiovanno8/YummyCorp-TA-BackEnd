import { ProductStock } from 'src/product/models/product-stock.entity';
import { Product } from 'src/product/models/product.entity';
import { Size } from 'src/product/models/size.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart-items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @ManyToOne(() => ProductStock, (productStock) => productStock.cartItems)
  productStock: ProductStock;

  @ManyToOne(() => Size, (size) => size.cartItems)
  size: Size;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
