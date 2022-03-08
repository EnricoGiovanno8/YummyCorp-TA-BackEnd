import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';

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
    const { password, ...otherData } = data;
    let newData = data;

    if (password) {
      if (password.length < 2 || password.length > 50) {
        throw new BadRequestException(
          'Password needs to be at least 2 characters and no more than 50 characters',
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      newData = {
        password: hashedPassword,
        ...otherData,
      };
    }

    await this.userRepository.update(id, newData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<any> {
    await this.userRepository.softDelete(id);
  }
}
