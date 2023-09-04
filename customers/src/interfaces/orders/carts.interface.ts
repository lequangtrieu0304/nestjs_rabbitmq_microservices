import { IsPositive, IsArray, IsNotEmpty } from 'class-validator';

export interface IAddToCart {
  productId: number;
  amount: number;
  userId: number;
}

export class BulkIdDto {
  @IsNotEmpty()
  @IsArray()
  @IsPositive({ each: true })
  ids: number[];
}
