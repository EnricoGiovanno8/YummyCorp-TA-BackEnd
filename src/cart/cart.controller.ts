import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CartService } from './cart.service';
import { Cart } from './models/cart.entity';
import { AddToCartDto } from './models/dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findUserCart(@Request() req: any): Promise<Cart[]> {
    return await this.cartService.findAll(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addToCart(@Request() req: any, @Body() body: AddToCartDto) {
    return await this.cartService.addToCart({ userId: req.user.id, ...body });
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteCart(@Request() req: any, @Body() body: any) {
    const { id } = body;
    return await this.cartService.delete({ id, user: req.user.id });
  }
}
