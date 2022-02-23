import { Exclude } from 'class-transformer';
import { Cart } from 'src/cart/models/cart.entity';
import { Order } from 'src/order/models/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserGenderType {
  Male = 'Male',
  Female = 'Female',
  Both = 'Both',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'User' })
  name: string;

  @Column({ default: UserGenderType.Both })
  gender: UserGenderType;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: '' })
  address: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Order, order => order.user)
  orders: Order[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
