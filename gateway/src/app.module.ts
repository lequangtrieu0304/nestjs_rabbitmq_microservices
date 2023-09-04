import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './services/guard/authorization.guard';

import { UserController } from './controllers/users/users.controller';
import { ProductsController } from './controllers/products/products.controller';
import { OrdersController } from './controllers/orders/orders.controller';

import { RMQ_PROXY_CONFIG } from './services/config/config-service';

const controllers = [UserController, ProductsController, OrdersController];

const serviceClients = [
  RMQ_PROXY_CONFIG.USER_SERVICE,
  RMQ_PROXY_CONFIG.TOKEN_SERVICE,
  RMQ_PROXY_CONFIG.PRODUCT_SERVICE,
];

@Module({
  imports: [ClientsModule.register([...serviceClients])],
  controllers: [...controllers],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
