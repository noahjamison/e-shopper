import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Variant } from './variant.entity';

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

  constructor(partial: Partial<Image>) {
    Object.assign(this, partial);
  }
}
