import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './models/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getTokenForUser(id: number): string {
    return this.jwtService.sign({ id });
  }

  async register(body): Promise<User> {
    const { email, password, passwordConfirmation } = body;
    const condition = { email };
    const user = await this.userService.findOne(condition);
    if (user) {
      throw new BadRequestException('Email already taken');
    }

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newData = { email, password: hashedPassword };
    const newUser = await this.userService.create(newData);

    return await this.userService.findOne(newUser.id)
  }

  async login(body: LoginDto): Promise<{ user: User; token: string }> {
    const { email, password } = body;
    const condition = { email };
    const user = await this.userService.findOne(condition);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = this.getTokenForUser(user.id);

    return {
      user: user,
      token: jwt,
    };
  }
}
