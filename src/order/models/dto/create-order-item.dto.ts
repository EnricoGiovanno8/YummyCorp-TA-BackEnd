import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  order: any;

  @IsNotEmpty()
  product: any;

  @IsNotEmpty()
  productStock: any;

  @IsNotEmpty()
  size: any;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
