import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/products/entities/product.entity';
import {
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiBadRequestResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('products')
@ApiConsumes('application/json')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns a list of products',
    operationId: 'getAllProducts',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Product,
    isArray: true,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Products not found' })
  getAllProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  @Get('/:productId')
  @ApiOperation({
    summary: 'Returns a single product',
    operationId: 'getProductById',
  })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'ID of product to return',
    schema: { oneOf: [{ type: 'integer', format: 'int64' }] },
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Product,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Invalid ID supplied',
    type: Product,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Product not found',
    type: Product,
  })
  getProductById(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.findProductById(productId);
  }
}
