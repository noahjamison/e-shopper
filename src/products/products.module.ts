import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from 'src/products/repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantRepository } from 'src/products/repositories/variant.repository';
import { ImageRepository } from 'src/products/repositories/image.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      VariantRepository,
      ImageRepository,
    ]),
    HttpModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
