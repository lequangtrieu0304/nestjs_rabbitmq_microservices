import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from 'src/shared/entities/product.entity';
import { CategoryEntity } from 'src/shared/entities/category.entity';
import { IProduct } from 'src/interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productReposity: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async getAllProductsByCategoryId(
    categoryId: number,
  ): Promise<IProduct[]> {
    const categoryExits = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!categoryExits)
      throw new NotFoundException('Không có loại sản phẩm này.');

    const products: IProduct[] = await this.productReposity
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .select([
        'product.id',
        'product.title',
        'product.description',
        'product.price',
        'product.stock',
        'product.images',
      ])
      .getMany();
    return products;
  }

  public async findOneByTitleAndCategory(
    categoryId: number,
    title: string,
  ): Promise<IProduct> {
    const categoryExits = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!categoryExits)
      throw new NotFoundException('Không có loại sản phẩm này.');

    const product: IProduct = await this.productReposity
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('category.id = :categoryId', { categoryId })
      .andWhere('product.title LIKE :title', { title: `%${title}%` })
      .select([
        'product.id',
        'product.title',
        'product.description',
        'product.price',
        'product.stock',
        'product.images',
      ])
      .getOne();
    if (!product)
      throw new NotFoundException(`Không tồn tại sản phẩm có tên ${title}`);
    return product;
  }

  public async getOneById(productId: number) {
    const product: IProduct = await this.productReposity.findOne({
      where: { id: productId },
    });
    if (!product)
      throw new NotFoundException(`Không tồn tại sản phẩm có ID ${productId}`);
    return product;
  }

  public async getListProducts(data: Array<number>) {
    const products: IProduct[] = await this.productReposity
      .createQueryBuilder('product')
      .where('product.id IN (:...data)', { data })
      .getMany();
    return products;
  }
}
