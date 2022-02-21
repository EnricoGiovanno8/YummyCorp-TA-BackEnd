import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductAddDto } from './models/dto/product-add.dto';
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
  async getProducts(
    @Query('keyword') keyword: string,
    @Query('page', ParseIntPipe) page = 1,
  ) {
    return await this.productService.findAllPaginated(keyword,page);
  }

  @Post()
  async addProduct(@Body() body: ProductAddDto) {
    const { productStocks, ...data } = body;

    const productExist = await this.productService.findOneProduct({
      name: data.name,
    });

    if (productExist) {
      throw new BadRequestException('Product Already Exist');
    } else {
      const newProduct = await this.productService.createProduct(data);

      await Promise.all(
        productStocks.map(async (productStock) => {
          const { size, ...dataStock } = productStock;
          const sizeExist = await this.sizeService.findOneSize({ name: size });

          if (!sizeExist) {
            const newSize = await this.sizeService.createSize({ name: size });

            await this.productStockService.createStock({
              ...dataStock,
              product: newProduct.id,
              size: newSize.id,
            });
          } else {
            await this.productStockService.createStock({
              ...dataStock,
              product: newProduct.id,
              size: sizeExist.id,
            });
          }
        }),
      );

      return await this.productService.findOneProduct(newProduct.id);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductUpdateDto,
  ) {
    const productExist = await this.productService.findOneProduct(id);
    if (!productExist) {
      throw new BadRequestException(`Product Doesn't Exist`);
    }

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
          const { size, ...dataStock } = productStock;
          const newSize = await this.sizeService.updateSize(size);
          await this.productStockService.updateStockFromProduct(
            id,
            newSize.id,
            dataStock,
          );
        }),
      );

      return this.productService.findOneProduct(id);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.deleteProduct(id);
    return {
      message: `Product with ID ${id} has been deleted`,
    };
  }
}
