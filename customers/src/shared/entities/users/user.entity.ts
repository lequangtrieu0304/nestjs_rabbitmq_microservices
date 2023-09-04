import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EState } from 'src/enums/user-enum';
import { OrderEntity } from '../orders/order.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: EState, default: EState.ACTIVE })
  state: string;

  @OneToMany(() => OrderEntity, (order) => order.createdBy)
  orders: OrderEntity[];
}
