import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import { Cart } from './models/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async findAll(): Promise<Cart[]> {
    return await this.cartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cart> {
    return await this.cartService.findOne(id);
  }

  // @Post()
  // @UseGuards(AuthGuard('jwt'))
  // async addToCart() {

  // }
}
