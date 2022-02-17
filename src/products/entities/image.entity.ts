import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Variant } from 'src/products/entities/variant.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source: string;

  @ManyToOne(() => Variant, (variant) => variant.image)
  variant: Variant;
}
