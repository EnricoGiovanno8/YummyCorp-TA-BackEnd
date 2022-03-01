import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './models/card.entity';
import { CreateCardDto } from './models/dto/create-card.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}

  async create(userId: any, data: CreateCardDto): Promise<Card> {
    const { cvc, ...input } = data;

    const hashedCvc = await bcrypt.hash(cvc, 10);
    const body = {
      user: userId,
      ...input,
      cvc: hashedCvc,
    };
    return await this.cardRepository.save(body);
  }

  async findUserCards(userId: number): Promise<Card[]> {
    return await this.cardRepository.find({
      where: { user: userId },
      relations: ['user'],
    });
  }

  async findOne(condition: any): Promise<Card> {
    return await this.cardRepository.findOne(condition, {
      relations: ['user'],
    });
  }

  async delete(id: number): Promise<any> {
    return await this.cardRepository.softDelete(id);
  }
}
