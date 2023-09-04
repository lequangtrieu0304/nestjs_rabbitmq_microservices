import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './shared/db/data-source';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
