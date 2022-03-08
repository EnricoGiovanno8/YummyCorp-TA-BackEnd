import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UploadProfilePictureController } from './upload-profile-picture.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController, UploadProfilePictureController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
