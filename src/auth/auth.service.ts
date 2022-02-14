import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public getTokenForUser(user: User): string {
      return this.jwtService.sign({
          email: user.email,
          sub: user.id
      })
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
    return await this.userService.create(newData);
  }

  async login(body): Promise<User> {
    const { email, password } = body;
    const condition = { email };
    const user = await this.userService.findOne(condition);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
