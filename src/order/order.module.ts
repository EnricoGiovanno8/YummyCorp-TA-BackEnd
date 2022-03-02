import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrderItem } from './models/order-item.entity';
import { Order } from './models/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemService } from './order-item.service';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    AuthModule,
    CartModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService],
})
export class OrderModule {}
