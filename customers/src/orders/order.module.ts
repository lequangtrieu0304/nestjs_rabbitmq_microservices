import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';

import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';

import { OrderEntity } from 'src/shared/entities/orders/order.entity';
import { OrderProductEntity } from 'src/shared/entities/orders/order-product.entity';
import { RMQ_PROXY_CONFIG } from 'src/services/config/config-service';

const serviceClients = [RMQ_PROXY_CONFIG.PRODUCT_SERVICE];

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderProductEntity]),
    ClientsModule.register([...serviceClients]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
