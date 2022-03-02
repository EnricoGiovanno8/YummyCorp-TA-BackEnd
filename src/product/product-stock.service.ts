import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductStock } from './models/product-stock.entity';

@Injectable()
export class ProductStockService {
  constructor(
    @InjectRepository(ProductStock)
    private readonly productStockRepository: Repository<ProductStock>,
  ) {}

  async createStock(data: any): Promise<ProductStock> {
    return await this.productStockRepository.save(data);
  }

  async findOneStock(condition: any): Promise<ProductStock> {
    return await this.productStockRepository.findOne(condition, {
      relations: ['product', 'size'],
    });
  }
  async update(id: number, data: any): Promise<ProductStock> {
    await this.productStockRepository.update(id, data);
    return this.findOneStock(id);
  }

  async updateStockFromProduct(
    productId: any,
    sizeId: any,
    data: any,
  ): Promise<any> {
    const stock = await this.findOneStock({ product: productId, size: sizeId });

    if (stock) {
      return await this.productStockRepository.update(
        { product: productId, size: sizeId },
        data,
      );
    } else {
      return await this.createStock({
        ...data,
        product: productId,
        size: sizeId,
      });
    }
  }
}
