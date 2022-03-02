import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from './models/favourite.entity';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Favourite)
    private readonly favouriteRepository: Repository<Favourite>,
  ) {}

  async findAll(userId: number, page = 1): Promise<any> {
    const take = 10;
    const [favourites, total] = await this.favouriteRepository.findAndCount({
      take,
      skip: (page - 1) * take,
      where: { user: userId },
      relations: [
        'product',
        'product.productStocks',
        'product.productStocks.size',
      ],
    });

    return {
      data: favourites,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / take),
      },
    };
  }

  async addToFavourite(userId: any, productId: any): Promise<Favourite> {
    return await this.favouriteRepository.save({
      user: userId,
      product: productId,
    });
  }

  async removeFromFavourite(id: number): Promise<any> {
    return await this.favouriteRepository.softDelete(id);
  }
}
