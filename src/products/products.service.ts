import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { HttpService } from '@nestjs/axios';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/products/repositories/product.repository';
import { VariantRepository } from 'src/products/repositories/variant.repository';
import { CreateVariantDto } from 'src/products/dto/create-variant.dto';
import { Variant } from 'src/products/entities/variant.entity';
import { ImageRepository } from 'src/products/repositories/image.repository';
import { CreateImageDto } from "src/products/dto/create-image.dto";
import { Image } from "src/products/entities/image.entity";

@Injectable()
export class ProductsService implements OnModuleInit {
  private logger = new Logger('ProductService', true);

  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(VariantRepository)
    private variantRepository: VariantRepository,
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit() {
    this.loadProductsFromUrl(
      'https://my-json-server.typicode.com/convictional/engineering-interview-api/products',
    );
  }

  private async loadProductsFromUrl(url: string): Promise<void> {
    this.logger.log('Fetching new products');

    this.httpService.get(url).subscribe(async (response) => {
      this.logger.log(`Response received from ${url}`);

      // TODO: Clean this up
      for (let i = 0; i < response.data.length; i++) {
        const productJson = response.data[i];

        const createProductDto = new CreateProductDto();

        createProductDto.code = productJson['id'];
        createProductDto.title = productJson['title'];
        createProductDto.vendor = productJson['vendor'];
        createProductDto.bodyHtml = productJson['body_html'];

        const product: Product = await this.createProduct(createProductDto);

        for (let j = 0; j < productJson['variants'].length; j++) {
          const variantJson = productJson['variants'][j];
          const createVariantDto = new CreateVariantDto();

          createVariantDto.id = variantJson['id'];
          createVariantDto.title = variantJson['title'];
          createVariantDto.sku = variantJson['sku'];
          createVariantDto.weight = variantJson['weight'];
          createVariantDto.weight_unit = variantJson['weight_unit'];

          const variant = await this.createVariant(createVariantDto, product);

          for (let k = 0; k < variantJson['images'].length; k++) {
            const imageJson = variantJson['images'][k];
            const createImageDto = new CreateImageDto();

            createImageDto.source = imageJson['src'];

            const image = await this.createImage(createImageDto, variant);
          }
        }
      }
    });
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.createProduct(createProductDto);
  }

  async createVariant(
    createVariantDto: CreateVariantDto,
    product: Product,
  ): Promise<Variant> {
    return await this.variantRepository.createVariant(
      createVariantDto,
      product,
    );
  }

  async createImage(
    createImageDto: CreateImageDto,
    variant: Variant,
  ): Promise<Image> {
    return await this.imageRepository.createImage(createImageDto, variant);
  }

  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findProductById(productId: string): Promise<Product> {
    return await this.productRepository.findOneOrFail(productId);
  }
}
