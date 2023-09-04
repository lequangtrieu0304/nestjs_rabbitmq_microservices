import { UserEntity } from 'src/shared/entities/users/user.entity';

export interface ICreateOrder {
  phone: string;
  customerName: string;
  province: string;
  district: string;
  items: number[];
  createdBy: UserEntity;
}
