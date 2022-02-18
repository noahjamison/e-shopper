import { EntityRepository, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger('ProductRepository', { timestamp: true });

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { code, title, vendor, bodyHtml } = createProductDto;

    const product = this.create({
      code,
      title,
      vendor,
      bodyHtml,
    });

    try {
      return await this.save(product);
    } catch (e) {
      switch (e.code) {
        case 'ER_DUP_ENTRY': {
          this.logger.error(
            `Failed to insert product. An entry already exists with code: ${product.code}`,
          );

          break;
        }

        default: {
          this.logger.error(
            `Failed to create product with code "${product.code}"`,
            e.stack,
          );

          throw new InternalServerErrorException();
        }
      }
    }
  }
}
