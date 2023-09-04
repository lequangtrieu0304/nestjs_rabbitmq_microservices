import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'order_product' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @Column()
  amount: number;

  @Column({ default: false })
  checked: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts, {
    onDelete: 'CASCADE',
  })
  order: OrderEntity;
}
