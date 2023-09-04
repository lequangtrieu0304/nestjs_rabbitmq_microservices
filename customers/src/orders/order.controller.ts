import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { OrdersService } from './order.service';
import { IAddToCart } from '../interfaces/orders/carts.interface';
import { ICreateOrder } from 'src/interfaces/orders/create-order.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('order_create')
  public async createOrder(@Payload() data: ICreateOrder) {
    return await this.ordersService.createOrder(data);
  }

  @MessagePattern('add_to_cart')
  public async addToCart(@Payload() data: IAddToCart) {
    return await this.ordersService.addToCart(data);
  }
}
