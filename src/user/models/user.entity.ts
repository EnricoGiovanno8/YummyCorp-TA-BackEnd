import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: "user" })
  name: string;

  @Column({ default: "" })
  gender: "Male" | "Female" | ""

  @Column()
  @Exclude()
  password: string;

  @Column({ default: "" })
  address: string
}
