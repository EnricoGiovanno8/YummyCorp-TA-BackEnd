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

  async findOneProduct(id: number) {
    return await this.productRepository.findOne(id, {
      relations: ['productStocks', 'productStocks.size'],
    });
  }

  async updateProduct(id: number, data: any) {
    await this.productRepository.update(id, data);

    return this.findOneProduct(id);
  }
}
