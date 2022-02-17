import { IsNotEmpty } from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  sku: string;

  // @IsNotEmpty()
  // available: number;

  // @IsNotEmpty()
  // inventory_quantity: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  weight_unit: string;
}
