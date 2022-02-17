import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductStock } from './models/product-stock.entity';
import { Product } from './models/product.entity';
import { Size } from './models/size.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductStock)
    private readonly productStockRepository: Repository<ProductStock>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['productStocks', 'productStocks.size'] });
  }
}
