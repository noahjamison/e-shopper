import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from 'src/products/controllers/products.controller';
import { ProductRepository } from 'src/products/repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantRepository } from 'src/products/repositories/variant.repository';
import { ImageRepository } from 'src/products/repositories/image.repository';
import { HttpModule } from '@nestjs/axios';
import { StoreController } from 'src/products/controllers/store.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      VariantRepository,
      ImageRepository,
    ]),
    HttpModule,
  ],
  controllers: [ProductsController, StoreController],
  providers: [ProductsService],
})
export class ProductsModule {}
