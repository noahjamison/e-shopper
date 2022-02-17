import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/products/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  @Get('/:productId')
  getProductById(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.findProductById(productId);
  }
}
