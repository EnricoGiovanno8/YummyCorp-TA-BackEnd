import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductGenderType } from '../product.entity';

class ProductStock {
  @IsNotEmpty()
  @IsInt()
  price?: number;

  @IsNotEmpty()
  @IsInt()
  stock?: number;

  @IsNotEmpty()
  @IsString()
  size?: string;
}

export class ProductAddDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  brand?: string;

  @IsNotEmpty()
  @IsIn([ProductGenderType.Men, ProductGenderType.Women])
  gender?: ProductGenderType;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductStock)
  productStocks?: ProductStock[];
}
