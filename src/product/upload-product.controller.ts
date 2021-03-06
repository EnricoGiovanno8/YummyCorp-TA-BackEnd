import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';

@Controller()
export class UploadProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('product-image/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/product-images',
        filename(_, file, callback) {
          const randomName = Array(8)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: function (_, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Image Format Invalid'), false);
        }

        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    const product = await this.productService.findOneProduct(id);

    if (product) {
      await this.productService.updateProduct(id, { image: file.filename });
      return {
        message: 'Upload Image Success',
      };
    } else {
      throw new BadRequestException('Product Not Found');
    }
  }

  @Get('product-image/:path')
  async getImage(@Param('path') path: any, @Res() res: Response) {
    res.sendFile(path, { root: 'assets/product-images' });
  }
}
