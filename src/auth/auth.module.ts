import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
    UserModule,
  ],
  providers: [LocalStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
