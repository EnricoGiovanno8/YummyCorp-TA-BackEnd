import { Exclude } from 'class-transformer';
import { Card } from 'src/card/models/card.entity';
import { Cart } from 'src/cart/models/cart.entity';
import { Order } from 'src/order/models/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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

  @Column()
  email: string;

  @Column({ default: 'User' })
  name: string;

  @Column()
  image: string;

  @Column({ default: UserGenderType.Both })
  gender: UserGenderType;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: '' })
  address: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
