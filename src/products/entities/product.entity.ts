import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Variant } from 'src/products/entities/variant.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  code: string;

  @Column()
  title: string;

  @Column()
  vendor: string;

  @Column()
  bodyHtml: string;

  @OneToMany(() => Variant, (variant) => variant.product, { eager: false })
  variants: Variant[];
}
