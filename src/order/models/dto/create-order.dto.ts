import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  user: any;

  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsInt()
  totalItems: number;

  @IsNotEmpty()
  @IsInt()
  totalAmount: number;
}
