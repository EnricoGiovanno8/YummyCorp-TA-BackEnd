import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(condition: any): Promise<User> {
    return await this.userRepository.findOne(condition);
  }

  async create(data: any): Promise<User> {
    return await this.userRepository.save(data);
  }

  async update(id: number, data: any): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<any> {
    await this.userRepository.softDelete(id);
  }
}
