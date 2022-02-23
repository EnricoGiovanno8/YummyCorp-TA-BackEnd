import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, Status } from './models/order.entity';
import { OrderItemService } from './order-item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderItemService: OrderItemService,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['orderItems'] });
  }

  async findOne(condition: any): Promise<Order> {
    return await this.orderRepository.findOne(condition, {
      relations: ['orderItems'],
    });
  }

  async findUserCart(email: string): Promise<Order> {
    return await this.findOne({
      userEmail: email,
      status: Status.Cart,
    });
  }

  async addToCart(data: any) {
    const cart = await this.findUserCart(data.userEmail);

    if (cart) {
      const orderItems = await this.orderItemService.findAll();
      const exist = orderItems.filter(
        (oI) =>
          oI.productName === data.product.name &&
          oI.productSize === data.product.size,
      );

      if (exist.length === 0) {
        return await this.orderItemService.create({
          productName: data.product.name,
          productSize: data.product.size,
          productPrice: data.product.price,
          productImage: data.product.image,
          quantity: data.product.quantity,
          order: cart.id
        });
      } else {
        return "ADA HARUS UPDATE QUANTITY"
      }
    } else {
        
    }
  }
}
