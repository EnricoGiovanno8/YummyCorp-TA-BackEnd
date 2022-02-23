import { Controller, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './models/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAll(): Promise<Cart[]> {
    return await this.cartService.findAll();
  }
}
