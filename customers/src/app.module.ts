import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './shared/db/data-source';
import { OrdersModule } from './orders/order.module';

const modules = [UsersModule, OrdersModule];

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ...modules],
  controllers: [],
  providers: [],
})
export class AppModule {}
