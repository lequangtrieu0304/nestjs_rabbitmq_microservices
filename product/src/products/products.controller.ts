import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { IProductResponse } from 'src/interfaces/fetch-product-response.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('get_alls_by_category')
  public async getAllProductsByCategoryId(
    @Payload() data: { categoryId: number },
  ): Promise<IProductResponse> {
    let result: IProductResponse;
    try {
      const products = await this.productsService.getAllProductsByCategoryId(
        data.categoryId,
      );
      result = {
        status: HttpStatus.OK,
        products: products,
        message: 'FETCH_SUCCESS',
      };
    } catch (e) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        products: null,
        message: e.message,
      };
    }
    return result;
  }

  @MessagePattern('find_one_by_name_and_category')
  public async findOneByTitleAndCategory(
    @Payload() data: { categoryId: number; title: string },
  ) {
    let result: IProductResponse;
    try {
      const products = await this.productsService.findOneByTitleAndCategory(
        data.categoryId,
        data.title,
      );
      result = {
        status: HttpStatus.OK,
        products: products,
        message: 'FETCH_SUCCESS',
      };
    } catch (e) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        products: null,
        message: e.message,
      };
    }
    return result;
  }

  @MessagePattern('get_one_by_id')
  public async getOneById(
    @Payload() data: { productId: string },
  ): Promise<IProductResponse> {
    let result: IProductResponse;
    try {
      const product = await this.productsService.getOneById(+data.productId);
      result = {
        status: HttpStatus.OK,
        products: product,
        message: 'FETCH_SUCCESS',
      };
    } catch (e) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        products: null,
        message: e.message,
      };
    }
    return result;
  }

  @MessagePattern('list_products')
  public async getListProducts(@Payload() data: { productIds: number[] }) {
    let result: IProductResponse;
    try {
      const products = await this.productsService.getListProducts(
        data.productIds,
      );
      result = {
        status: HttpStatus.OK,
        products,
        message: 'FETCH_SUCCESS',
      };
    } catch (e) {
      result = {
        status: HttpStatus.BAD_REQUEST,
        products: null,
        message: e.message,
      };
    }
    return result;
  }
}
