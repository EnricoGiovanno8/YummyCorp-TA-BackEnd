import { Body, ClassSerializerInterceptor, Controller, Get, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddToCartDto } from './models/dto/add-to-cart.dto';
import { OrderService } from './order.service';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getProducts() {
    return await this.orderService.findAll();
  }

  @Get('cart')
  @UseGuards(AuthGuard('jwt'))
  async getUserCart(@Request() req) {
    const email = req.user.email;
    return await this.orderService.findUserCart(email)
  }

  @Post('cart')
  async addToCart(@Body() body: AddToCartDto) {
      return await this.orderService.addToCart(body)
  }
}
