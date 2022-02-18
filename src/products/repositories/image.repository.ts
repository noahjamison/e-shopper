import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Image } from '../entities/image.entity';
import { Variant } from '../entities/variant.entity';
import { CreateImageDto } from '../dto/create-image.dto';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  private logger = new Logger('ImageRepository', { timestamp: true });

  async createImage(
    createImageDto: CreateImageDto,
    variant: Variant,
  ): Promise<Image> {
    const { source } = createImageDto;

    const image = this.create({
      source,
      variant,
    });

    try {
      return await this.save(image);
    } catch (e) {
      switch (e.code) {
        case 'ER_DUP_ENTRY': {
          this.logger.error(
            `Failed to insert image. An entry already exists with id: ${image.id}`,
          );

          break;
        }

        default: {
          this.logger.error(
            `Failed to create image with source "${image.source}"`,
            e.stack,
          );

          throw new InternalServerErrorException();
        }
      }
    }
  }
}
