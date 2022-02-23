import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './models/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find();
  }

  async findOne(condition: any): Promise<OrderItem> {
    return await this.orderItemRepository.findOne(condition);
  }

  async create(data: any): Promise<OrderItem> {
    return await this.orderItemRepository.save(data);
  }

  async update(id: number, data: any): Promise<OrderItem> {
    await this.orderItemRepository.update(id, data);
    return this.findOne(id);
  }
}
