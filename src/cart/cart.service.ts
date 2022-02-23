import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './models/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.find({ relations: ['user'] });
  }

  async findOne(condition: any): Promise<Cart> {
    return await this.cartRepository.findOne(condition);
  }
}
