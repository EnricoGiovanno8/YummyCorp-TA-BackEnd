import { IsInt, IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  productStockId: number;

  @IsNotEmpty()
  @IsInt()
  sizeId: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
