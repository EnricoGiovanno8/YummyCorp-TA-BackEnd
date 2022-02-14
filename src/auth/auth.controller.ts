import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './models/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return {
      id: req.user.id,
      token: this.authService.getTokenForUser(req.user)
    }
  }
}
