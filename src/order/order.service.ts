import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';
import Stripe from 'stripe';
import { CreateOrderDto } from './models/dto/create-order.dto';
import { CartService } from 'src/cart/cart.service';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './models/dto/create-order-item.dto';
import { ProductStockService } from 'src/product/product-stock.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
    private readonly orderItemService: OrderItemService,
    private readonly productStockService: ProductStockService,
  ) {}

  async create(data: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.save(data);
  }

  async pay(userId: number, body: any): Promise<any> {
    const stripeClient = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2020-08-27',
    });
    return await stripeClient.charges
      .create({
        amount: body.amount,
        source: body.token,
        currency: 'USD',
      })
      .then(async () => {
        const orderNumber = `INV-${Date.now()}`;
        const createOrderData: CreateOrderDto = {
          user: userId,
          orderNumber,
          totalItems: body.totalItems,
          totalAmount: body.amount,
        };
        const newOrder = await this.create(createOrderData);
        const cart = await this.cartService.findAll(userId);
        await Promise.all(
          cart.map(async (cartItem) => {
            const createOrderItemData: CreateOrderItemDto = {
              order: newOrder.id,
              product: cartItem.product.id,
              productStock: cartItem.productStock.id,
              size: cartItem.size.id,
              quantity: cartItem.quantity,
            };
            await this.orderItemService
              .create(createOrderItemData)
              .then(async () => {
                const productStock =
                  await this.productStockService.findOneStock(
                    cartItem.productStock.id,
                  );
                const { stock, ...otherData } = productStock;
                const newProductStock = {
                  ...otherData,
                  stock: stock - cartItem.quantity,
                };
                await this.productStockService.update(
                  cartItem.productStock.id,
                  newProductStock,
                );
                await this.cartService.delete(cartItem.id);
              });
          }),
        );
        return 'PAYMENT SUCCESS';
      })
      .catch((e) => console.log(e));
  }
}
