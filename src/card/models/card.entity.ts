import { User } from 'src/user/models/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum CreditCardType {
    Visa = "VISA",
    Mastercard = "MASTERCARD"
}

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  number: string

  @Column()
  expMonth: string

  @Column()
  expYear: string

  @Column()
  cvc: string

  @Column()
  type: CreditCardType

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
