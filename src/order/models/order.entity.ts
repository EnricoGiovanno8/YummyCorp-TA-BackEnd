import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum Status {
  Cart = 'Cart',
  Complete = 'Complete',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userEmail: string

  @Column()
  orderNumber: string;

  @CreateDateColumn()
  date: string;

  @Column({ default: Status.Cart })
  status: Status;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Expose()
  get total(): number {
    return this.orderItems.reduce(
      (sum: number, i: OrderItem) => sum + i.quantity * i.productPrice,
      0,
    );
  }
}
