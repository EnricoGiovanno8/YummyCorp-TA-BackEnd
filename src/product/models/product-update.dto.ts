import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductGenderType } from './product.entity';

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

export class ProductUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsIn([ProductGenderType.Men, ProductGenderType.Women])
  gender?: ProductGenderType;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductStock)
  productStock?: ProductStock[];
}
