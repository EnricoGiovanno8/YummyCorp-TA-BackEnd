import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './models/login.dto';
import { RegisterDto } from './models/register.dto';
import { Request, Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.userService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.userService.login(body, response);
  }

  @Get('user')
  async user(@Req() request: Request) {
    return await this.userService.getUserByCookie(request);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
      return await this.userService.logout(response)
  }
}
