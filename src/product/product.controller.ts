import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Get()
    async getAllProducts() {
        return await this.productService.findAll()
    }
    @Get('stock')
    async getstock() {
        return await this.productService.findStock()
    }
}
