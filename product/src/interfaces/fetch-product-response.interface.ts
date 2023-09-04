import { IProduct } from './product.interface';

export interface IProductResponse {
  status: number;
  products: IProduct[] | IProduct | null;
  message: string;
}
