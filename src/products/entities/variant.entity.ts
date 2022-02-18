import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Image } from 'src/products/entities/image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Variant {
  @PrimaryColumn()
  @ApiProperty({ type: 'string' })
  id: string;

  @Column()
  @ApiProperty({ type: 'string' })
  title: string;

  @Column()
  @ApiProperty({ type: 'string' })
  sku: string;

  @Column()
  @ApiProperty({ type: 'integer', format: 'int64' })
  weight_value: number;

  @Column()
  @ApiProperty({ type: 'string' })
  weight_unit: string;

  @ManyToOne(() => Product, (product) => product.variants, { eager: false })
  product: Product;

  @OneToMany(() => Image, (image) => image.variant, { eager: false })
  image: Image;

  @ApiProperty({
    description:
      'Inventory for given variant. Should be 0 if no information provided',
    default: 0,
    type: 'integer',
    format: 'int64',
  })
  inventory_quantity: number;

  @ApiProperty({
    description: 'True if inventory > 0, false otherwise',
    default: false,
    type: 'boolean',
  })
  available: boolean;
}
