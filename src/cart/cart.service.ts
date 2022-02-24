import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './models/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async findAll(userId: number): Promise<Cart[]> {
    return await this.cartRepository.find({
      where: { user: userId },
      relations: ['user', 'product', 'productStock', 'size'],
    });
  }

  async findOne(condition: any): Promise<Cart> {
    return await this.cartRepository.findOne(condition, {
      relations: ['user', 'product', 'productStock', 'size'],
    });
  }

  async create(data: any): Promise<Cart> {
    const newData = await this.cartRepository.save(data);
    return await this.findOne(newData.id);
  }

  async update(condition: any, data: any): Promise<Cart> {
    await this.cartRepository.update(condition, data);
    return await this.findOne(condition);
  }

  async delete(condition: any): Promise<any> {
    return await this.cartRepository.delete(condition).then(() => ({
      message: 'SUCCESS',
    }));
  }

  async addToCart(data: any): Promise<Cart> {
    const {
      userId,
      productId,
      productStockId,
      sizeId,
      quantity: newQuantity,
    } = data;

    const condition = {
      user: userId,
      product: productId,
      productStock: productStockId,
      size: sizeId,
    };

    const exist = await this.findOne(condition);

    if (exist) {
      const { id, quantity } = exist;

      const updatedQuantity = quantity + newQuantity;
      return await this.update(id, { quantity: updatedQuantity });
    } else {
      return await this.create({
        user: userId,
        product: productId,
        productStock: productStockId,
        size: sizeId,
        quantity: newQuantity,
      });
    }
  }
}
