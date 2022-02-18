import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/axios/dist/http.constants';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Variant } from './entities/variant.entity';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { CreateVariantDto } from './dto/create-variant.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Inventory } from './entities/inventory.entity';

const mockProduct = new Product({
  code: '1000000001',
  title: 'A mock product',
  vendor: 'Product Vendor',
  bodyHtml: '<strong>HTML</strong>',
});

const mockImage = new Image({
  source: 'easy-image-host.com/fancy-image.jpg',
});

const mockVariant = new Variant({
  id: '1000000002',
  title: 'A mock variant',
  sku: 'Variant-SKU-1',
  weight_value: 2,
  weight_unit: 'lb',
  inventory_quantity: 0,
  image: mockImage,
  product: mockProduct,
});

const mockInventory = new Array<Inventory>({
  productId: mockProduct.code,
  variantId: mockVariant.id,
  stock: mockVariant.inventory_quantity,
});

describe('ProductsService', () => {
  let service: ProductsService;
  let mockHttpService: HttpService;
  let productRepositoryMock: Repository<Product>;
  let variantRepositoryMock: Repository<Variant>;
  let imageRepositoryMock: Repository<Image>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        HttpService,
        { provide: AXIOS_INSTANCE_TOKEN, useValue: '' },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([mockProduct]),
            findOneOrFail: jest.fn().mockResolvedValue(mockProduct),
            createProduct: jest.fn().mockReturnValue(mockProduct),
          },
        },
        {
          provide: getRepositoryToken(Variant),
          useValue: {
            find: jest.fn().mockResolvedValue([mockVariant]),
            findOneOrFail: jest.fn().mockResolvedValue(mockVariant),
            createVariant: jest.fn().mockReturnValue(mockVariant),
          },
        },
        {
          provide: getRepositoryToken(Image),
          useValue: {
            find: jest.fn().mockResolvedValue([mockImage]),
            findOneOrFail: jest.fn().mockResolvedValue(mockImage),
            createImage: jest.fn().mockReturnValue(mockImage),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    mockHttpService = module.get<HttpService>(HttpService);

    productRepositoryMock = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    variantRepositoryMock = module.get<Repository<Variant>>(
      getRepositoryToken(Variant),
    );
    imageRepositoryMock = module.get<Repository<Image>>(
      getRepositoryToken(Image),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can get inventory', () => {
    expect(service.getInventory()).resolves.toEqual(mockInventory);
  });

  it('can create a product', () => {
    const json = new Map<string, any>([
      ['code', mockProduct.code],
      ['title', mockProduct.title],
      ['vendor', mockProduct.vendor],
      ['bodyHtml', mockProduct.bodyHtml],
    ]);

    const createProductDto = new CreateProductDto(json);

    expect(service.createProduct(createProductDto)).resolves.toEqual(
      mockProduct,
    );
  });

  it('can create a variant', () => {
    const json = new Map<string, any>([
      ['id', mockVariant.id],
      ['title', mockVariant.title],
      ['sku', mockVariant.sku],
      ['weight_value', mockVariant.weight_value],
      ['weight_unit', mockVariant.weight_unit],
      ['image', mockImage],
      ['product', mockProduct],
    ]);

    const createVariantDto = new CreateVariantDto(json);

    expect(
      service.createVariant(createVariantDto, mockProduct),
    ).resolves.toEqual(mockVariant);
  });

  it('can create an image', () => {
    const json = new Map<string, any>([['src', mockImage.source]]);

    const createImageDto = new CreateImageDto(json);

    expect(service.createImage(createImageDto, mockVariant)).resolves.toEqual(
      mockImage,
    );
  });

  it('can find all products', () => {
    expect(service.findAllProducts()).resolves.toEqual([mockProduct]);
  });

  it('can find a product by ID', () => {
    const repoSpy = jest.spyOn(productRepositoryMock, 'findOneOrFail');

    expect(service.findProductById(mockProduct.code)).resolves.toEqual(
      mockProduct,
    );
    expect(repoSpy).toBeCalledWith(mockProduct.code);
  });
});
