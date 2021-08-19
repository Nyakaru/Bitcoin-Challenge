import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  day!: string;

  @Column()
  value!: number;

  @Column()
  prime!: number;

  @Column({ nullable: true })
  userId!: number;
  @ManyToOne((_type) => User, (user: User) => user.wishlist)
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
