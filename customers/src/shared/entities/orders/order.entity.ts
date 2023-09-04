import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../users/user.entity';
import { OrderProductEntity } from './order-product.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true, default: null })
  province: string;

  @Column({ nullable: true, default: null })
  district: string;

  @Column({
    nullable: true,
    default: 0,
    type: 'float',
    comment: 'Tổng giá trị đơn hàng',
  })
  totalMoney: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  createdBy: UserEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts: OrderProductEntity[];
}
