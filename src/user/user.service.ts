import {
  Injectable,
} from '@nestjs/common';
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

  async findOne(condition): Promise<User> {
    return await this.userRepository.findOne(condition);
  }

  async create(data): Promise<User> {
    return await this.userRepository.save(data)
  }

  // async update(data): Promise<User> {
  //   return await this.userRepository.update(data)
  // }

  // Remove
}
