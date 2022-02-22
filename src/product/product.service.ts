import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllPaginated(
    keyword: string,
    page = 1,
    gender: string,
  ): Promise<any> {
    const take = 10;

    if (gender === 'Men' || gender === 'Women') {
      const [products, total] = await this.productRepository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['productStocks', 'productStocks.size'],
        where: [{ name: Like(`%${keyword}%`), gender }],
      });

      return {
        data: products,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / take),
        },
      };
    } else {
      const [products, total] = await this.productRepository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations: ['productStocks', 'productStocks.size'],
        where: [{ name: Like(`%${keyword}%`) }],
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
  }

  async createProduct(data: any): Promise<Product> {
    return await this.productRepository.save(data);
  }

  async findOneProduct(condition: any): Promise<Product> {
    return await this.productRepository.findOne(condition, {
      relations: ['productStocks', 'productStocks.size'],
    });
  }

  async deleteProduct(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }

  async updateProduct(id: number, data: any): Promise<Product> {
    await this.productRepository.update(id, data);

    return this.findOneProduct(id);
  }
}
