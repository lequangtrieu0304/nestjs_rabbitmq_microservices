import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { IAddToCart } from '../interfaces/orders/carts.interface';
import { OrderProductEntity } from 'src/shared/entities/orders/order-product.entity';
import { OrderEntity } from '../shared/entities/orders/order.entity';
import { ICreateOrder } from '../interfaces/orders/create-order.interface';
import { IProduct } from '../interfaces/products/product.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderProductEntity)
    private readonly orderProductRepository: Repository<OrderProductEntity>,
    @Inject('PRODUCT_SERVICE')
    private readonly productServiceClient: ClientProxy,
  ) {}

  public async addToCart(data: IAddToCart) {
    const productInCart = await this.orderProductRepository.findOneBy({
      productId: data.productId,
      order: IsNull(),
      user: { id: data.userId },
    });

    if (productInCart)
      throw new BadRequestException('Sản phẩm đã có trong giỏ hàng.');

    return await this.orderProductRepository.save({
      productId: data.productId,
      amount: data.amount,
      user: { id: data.userId },
    });
  }

  public async removeItemCarts(items: number[]) {
    return await this.orderProductRepository.delete({ id: In(items) });
  }

  public async createOrder(data: ICreateOrder) {
    const items = await this.orderProductRepository.findBy({
      id: In(data.items),
      order: IsNull(),
      user: { id: data.createdBy.id },
    });
    const productIds = items.map((e) => e.productId);
    const { products } = await firstValueFrom(
      this.productServiceClient.send('list_products', { productIds }),
    );

    let totalMoney = 0;
    items.forEach((item) => {
      const price: number = products.find(
        (product: IProduct) => product.id === item.productId,
      ).price;
      totalMoney += item.amount * price;
    });

    return await this.orderRepository.save({
      ...data,
      orderProducts: items,
      totalMoney,
    });
  }
}
