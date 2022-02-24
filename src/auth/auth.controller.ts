import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './models/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './models/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
