import { Get, Controller, Inject, Query, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { Authorization } from 'src/decorator/authorization.decorator';
import { IFetchProductResponse } from 'src/interfaces/products/fectch-product-response.interface';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCT_SERVICE') private readonly productServiceClient: ClientProxy) {}

  @Get('getAlls-by-category')
  @Authorization(true)
  public async getAllProductsByCategory(
    @Query('categoryId') categoryId: number,
  ): Promise<IFetchProductResponse> {
    const fetchProductResponse = await firstValueFrom(
      this.productServiceClient.send('get_alls_by_category', { categoryId }),
    );
    return {
      status: fetchProductResponse.status,
      data: fetchProductResponse.data,
      message: fetchProductResponse.message,
    };
  }

  @Get('findOne-by-nameAndCategory')
  @Authorization(true)
  public async findOneByNameAndCategory(
    @Query('categoryId') categoryId: string,
    @Query('title') title: string,
  ): Promise<IFetchProductResponse> {
    const fetchProductResponse = await firstValueFrom(
      this.productServiceClient.send('find_one_by_name_and_category', { categoryId, title }),
    );
    return {
      status: fetchProductResponse.status,
      data: fetchProductResponse.data,
      message: fetchProductResponse.message,
    };
  }

  @Get('getOne/:id')
  @Authorization(true)
  public async getOneById(@Param('id') productId: string): Promise<IFetchProductResponse> {
    const fetchProductResponse = await firstValueFrom(
      this.productServiceClient.send('get_one_by_id', { productId }),
    );
    return {
      status: fetchProductResponse.status,
      data: fetchProductResponse.data,
      message: fetchProductResponse.message,
    };
  }
}
