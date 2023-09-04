import { IProduct } from './product.interface';

export interface IFetchProductResponse {
  status: number;
  data: IProduct;
  message: string;
}
