import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/shared/entities/product.entity';
import { CategoryEntity } from 'src/shared/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
