import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductUpdateDto } from './models/product-update.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query('page', ParseIntPipe) page = 1) {
    return await this.productService.findAllPaginated(page);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductUpdateDto,
  ) {
    const { productStock } = body;

    if (!productStock) {
      return await this.productService.updateProduct(id, body);
    } else {
    return {
      message: 'ada product stock perlu step lagi',
    };
    }
  }
}
