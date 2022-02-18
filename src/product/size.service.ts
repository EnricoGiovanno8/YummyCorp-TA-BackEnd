import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './models/size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async createSize(name: string) {
    return await this.sizeRepository.save({ name });
  }

  async findOneSize(name: string): Promise<Size> {
    return await this.sizeRepository.findOne(
      { name },
      { relations: ['productStocks'] },
    );
  }

  async updateSize(name: string): Promise<any> {
    const size = await this.findOneSize(name);

    if (!size) {
      return await this.createSize(name);
    } else {
      return size;
    }
  }
}
