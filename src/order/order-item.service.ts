import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './models/dto/create-order-item.dto';
import { OrderItem } from './models/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(data: CreateOrderItemDto): Promise<OrderItem> {
    return await this.orderItemRepository.save(data);
  }
}
