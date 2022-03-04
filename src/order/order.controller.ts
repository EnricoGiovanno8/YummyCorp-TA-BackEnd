import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
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

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getHistory(@Request() req: any, @Query('month') month: string) {
    return await this.orderService.findAll(req.user.id, month);
  }

  @Post('pay')
  @UseGuards(AuthGuard('jwt'))
  async pay(@Request() req: any, @Body() body: any): Promise<any> {
    return await this.orderService.pay(req.user.id, body);
  }
}
