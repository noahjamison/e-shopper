import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Product } from 'src/products/entities/product.entity';
import { Image } from 'src/products/entities/image.entity';

@Entity()
export class Variant {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  sku: string;

  // @Column()
  // available: number;

  // @Column({ type: 'bigint' })
  // inventory_quantity: number;

  @Column()
  weight: number;

  @Column()
  weight_unit: string;

  @ManyToOne(() => Product, (product) => product.variants, { eager: false })
  product: Product;

  @OneToMany(() => Image, (image) => image.variant, { eager: false })
  image: Image;
}
