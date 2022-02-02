import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async all(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(condition): Promise<User> {
    return await this.userRepository.findOne(condition);
  }

  async register(body): Promise<User> {
    const { email, password, passwordConfirmation } = body;
    const condition = { email };
    const user = await this.findOne(condition);
    if (user) {
      throw new BadRequestException('Email already taken');
    }

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newData = { email, password: hashedPassword };
    return await this.userRepository.save(newData);
  }

  async login(body, response): Promise<User> {
    const { email, password } = body;
    const condition = { email };
    const user = await this.findOne(condition);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }

  async getUserByCookie(request): Promise<User> {
    const cookie = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);

    const user = await this.findOne({ id: data.id });

    return user;
  }

  async logout(response): Promise<object>{
    response.clearCookie('jwt')
    
    return {
      message: 'Success'
    }
  }
}
