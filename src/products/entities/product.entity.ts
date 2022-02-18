import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Variant } from './variant.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  @ApiProperty({ type: 'string' })
  code: string;

  @Column()
  @ApiProperty({ type: 'string', description: 'Product title' })
  title: string;

  @Column()
  @ApiProperty({ type: 'string', description: 'Product vendor' })
  vendor: string;

  @Column()
  @ApiProperty({ type: 'string', description: 'HTML description of a product' })
  bodyHtml: string;

  @OneToMany(() => Variant, (variant) => variant.product, { eager: false })
  @ApiProperty({ type: 'array', items: { type: 'variant' } })
  variants: Variant[];

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
