import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';

class Product {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  userEmail: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Product)
  product: Product;
}
