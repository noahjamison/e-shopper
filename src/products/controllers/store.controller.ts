import { Controller, Get } from '@nestjs/common';
import { Inventory } from 'src/products/entities/inventory.entity';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from 'src/products/products.service';

@ApiTags('store')
@ApiConsumes('application/json')
@Controller('store')
export class StoreController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/inventory')
  @ApiOperation({
    summary: 'Returns product inventories',
    description: 'Returns an array of inventory objects for each variant',
    operationId: 'getInventory',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Inventory,
  })
  getInventory(): Promise<Inventory[]> {
    return this.productsService.getInventory();
  }
}
