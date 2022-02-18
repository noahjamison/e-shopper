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

  constructor(json: Map<string, any>) {
    this.code = json['id'];
    this.title = json['title'];
    this.vendor = json['vendor'];
    this.bodyHtml = json['body_html'];
  }
}
