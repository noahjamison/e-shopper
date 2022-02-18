import { IsNotEmpty } from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  weight_value: number;

  @IsNotEmpty()
  weight_unit: string;

  constructor(json: Map<string, any>) {
    this.id = json['id'];
    this.title = json['title'];
    this.sku = json['sku'];
    this.weight_value = json['weight'];
    this.weight_unit = json['weight_unit'];
  }
}
