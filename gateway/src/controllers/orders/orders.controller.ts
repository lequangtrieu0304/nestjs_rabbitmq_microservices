import { Controller, Inject, Post, Req, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { Authorization } from 'src/decorator/authorization.decorator';
import { AddToCartDto } from 'src/interfaces/orders/dto/add-to-cart.dto';
import { CreateOrderDto } from 'src/interfaces/orders/dto/create-order.dto';
import { IAuthorizedRequest } from 'src/interfaces/request-authoried.interface';

@Controller('orders')
export class OrdersController {
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) {}

  @Post('create-order')
  @Authorization(true)
  public async createOrder(@Req() requestUser: IAuthorizedRequest, @Body() data: CreateOrderDto) {
    const userInfo = requestUser.user;
    const createOrderResponse = await firstValueFrom(
      this.userServiceClient.send('order_create', { ...data, createdBy: userInfo }),
    );
    return {
      status: createOrderResponse.status,
      data: createOrderResponse.data,
      message: createOrderResponse.message,
    };
  }

  @Post('add-to-cart')
  @Authorization(true)
  public async addToCart(@Req() requestUser: IAuthorizedRequest, @Body() data: AddToCartDto) {
    const userInfo = requestUser.user;
    return await firstValueFrom(
      this.userServiceClient.send('add_to_cart', { ...data, userId: userInfo.id }),
    );
    // console.log(addToCartResponse);
    // return {
    //   status: addToCartResponse.status,
    //   data: addToCartResponse.data,
    //   message: addToCartResponse.message,
    // };
  }
}
