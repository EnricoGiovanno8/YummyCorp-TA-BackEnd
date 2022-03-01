import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('pay')
  @UseGuards(AuthGuard('jwt'))
  async pay(@Request() req: any, @Body() body: any): Promise<any> {
    return await this.orderService.pay(req.user.id, body)
  }
}
