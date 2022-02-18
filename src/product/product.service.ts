import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllPaginated(page = 1): Promise<any> {
    const take = 1;

    const [products, total] = await this.productRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations: ['productStocks', 'productStocks.size'],
    });

    return {
      data: products,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / take),
      },
    };
  }

  async findOneProduct(condition: any): Promise<Product> {
    return await this.productRepository.findOne(condition, {
      relations: ['productStocks', 'productStocks.size'],
    });
  }

  async createProduct(data: any): Promise<Product> {
    return await this.productRepository.save(data)
  }

  async updateProduct(id: number, data: any): Promise<Product> {
    await this.productRepository.update(id, data);

    return this.findOneProduct(id);
  }
}
