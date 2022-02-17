import { IsNotEmpty } from 'class-validator';
import { CreateVariantDto } from 'src/products/dto/create-variant.dto';

export class CreateProductDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  vendor: string;

  @IsNotEmpty()
  bodyHtml: string;

  @IsNotEmpty()
  variants: CreateVariantDto[];

  // TODO: Add constructor?
  // constructor(partial: Partial<CreateProductDto>) {
  //   Object.assign(this, partial);
  // }
}
