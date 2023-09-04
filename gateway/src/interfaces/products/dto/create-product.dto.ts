import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title can not be empty.' })
  @IsString({ message: 'Title should be string.' })
  title: string;

  @IsNotEmpty({ message: 'Description can not be empty.' })
  @IsString({ message: 'Description should be string.' })
  description: string;

  @IsNotEmpty({ message: 'Price can not be empty.' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price should be number.' })
  price: number;

  @IsNotEmpty({ message: 'Images can not be empty.' })
  @IsArray({ message: 'Images should be array.' })
  images: string[];

  @IsNotEmpty({ message: 'Stock can not be empty.' })
  @IsNumber({}, { message: 'Stock should be number.' })
  stock: number;

  @IsNotEmpty({ message: 'CategoryId can not be empty.' })
  @IsNumber({}, { message: 'CategoryId id should be number.' })
  categoryId: number;
}
