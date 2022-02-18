import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductUpdateDto } from './models/dto/product-update.dto';
import { ProductStockService } from './product-stock.service';
import { ProductService } from './product.service';
import { SizeService } from './size.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly sizeService: SizeService,
    private readonly productStockService: ProductStockService,
  ) {}

  @Get()
  async getProducts(@Query('page', ParseIntPipe) page = 1) {
    return await this.productService.findAllPaginated(page);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductUpdateDto,
  ) {
    const { productStocks, ...data } = body;

    if (!productStocks) {
      return await this.productService.updateProduct(id, body);
    } else {
      if (data.name || data.brand || data.gender) {
        const newBody = data;
        await this.productService.updateProduct(id, newBody);
      }

      await Promise.all(
        productStocks.map(async (productStock) => {
          const { size, ...dataStock } = productStock
          const newSize = await this.sizeService.updateSize(size);
          await this.productStockService.updateStockFromProduct(id, newSize.id, dataStock)
        }),
      );

      return this.productService.findOneProduct(id)
    }
  }
}

// let newBody = {};
// if (name) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   newBody = { ...newBody, name };
// }
// if (brand) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   newBody = { ...newBody, brand };
// }
// if (gender) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   newBody = { ...newBody, gender };
// }
// console.log('body', body);
// console.log('newBody', newBody);
