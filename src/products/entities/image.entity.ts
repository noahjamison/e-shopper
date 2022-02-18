import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Variant } from 'src/products/entities/variant.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Variant, (variant) => variant.image)
  @ApiProperty({
    type: 'string',
    description: 'ID for the variant the image relates to',
  })
  variant: Variant;

  @Column()
  @ApiProperty({ type: 'string' })
  source: string;
}
