import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStock } from './models/product-stock.entity';
import { Product } from './models/product.entity';
import { Size } from './models/size.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UploadProductController } from './upload-product.controller';
import { SizeService } from './size.service';
import { ProductStockService } from './product-stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductStock, Size])],
  controllers: [ProductController,  UploadProductController],
  providers: [ProductService, SizeService, ProductStockService],
  exports: [ProductStockService]
})
export class ProductModule {}
