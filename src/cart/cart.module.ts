import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './models/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), AuthModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
