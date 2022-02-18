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

  async createSize(data: any): Promise<Size> {
    return await this.sizeRepository.save(data);
  }

  async findOneSize(condition: any): Promise<Size> {
    return await this.sizeRepository.findOne(condition, {
      relations: ['productStocks'],
    });
  }

  async updateSize(name: string): Promise<any> {
    const size = await this.findOneSize({ name });

    if (!size) {
      return await this.createSize({ name });
    } else {
      return size;
    }
  }
}
