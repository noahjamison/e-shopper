import { ApiProperty } from '@nestjs/swagger';

export class Inventory {
  @ApiProperty({ type: 'string' })
  productId: string;

  @ApiProperty({ type: 'string' })
  variantId: string;

  @ApiProperty({ type: 'integer', format: 'int64' })
  stock: number;

  constructor(partial: Partial<Inventory>) {
    Object.assign(this, partial);
  }
}
