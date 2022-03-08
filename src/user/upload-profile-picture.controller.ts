import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';

@Controller('profile-picture')
export class UploadProfilePictureController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/profile-pictures',
        filename(_, file, callback) {
          const randomName = Array(8)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    const user = await this.userService.findOne(req.user.id);

    if (user) {
      await this.userService.update(req.user.id, { image: file.filename });
      return {
        message: 'Upload Image Success',
      };
    } else {
      throw new BadRequestException('User Not Found');
    }
  }

  @Get(':path')
  async getImage(@Param('path') path: any, @Res() res: Response) {
    res.sendFile(path, { root: 'assets/profile-pictures' });
  }
}
