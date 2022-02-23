import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('order-items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string

  @Column()
  productSize: string

  @Column()
  productPrice: number

  @Column()
  productImage: string

  @Column()
  quantity: number;

  @ManyToOne(() => Order, order => order.orderItems)
  order: Order;
}
