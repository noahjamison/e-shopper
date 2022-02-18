import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Variant } from '../entities/variant.entity';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { Product } from '../entities/product.entity';

@EntityRepository(Variant)
export class VariantRepository extends Repository<Variant> {
  private logger = new Logger('VariantRepository', { timestamp: true });

  async createVariant(
    createVariantDto: CreateVariantDto,
    product: Product,
  ): Promise<Variant> {
    const { id, title, sku, weight_value, weight_unit } = createVariantDto;

    const variant = this.create({
      id,
      title,
      sku,
      weight_value,
      weight_unit,
      product,
    });

    try {
      return await this.save(variant);
    } catch (e) {
      switch (e.code) {
        case 'ER_DUP_ENTRY': {
          this.logger.error(
            `Failed to insert variant. An entry already exists with id: ${variant.id}`,
          );

          break;
        }

        default: {
          this.logger.error(
            `Failed to create variant with id "${variant.id}"`,
            e.stack,
          );

          throw new InternalServerErrorException();
        }
      }
    }
  }
}
