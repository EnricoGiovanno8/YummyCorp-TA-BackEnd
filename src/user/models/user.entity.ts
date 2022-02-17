import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserGenderType {
  Male = "Male",
  Female = "Female",
  Both = "Both"
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ default: "User" })
  name: string;

  @Column({ default: UserGenderType.Both })
  gender: UserGenderType

  @Column()
  @Exclude()
  password: string;

  @Column({ default: "" })
  address: string
}
