import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoreDTO {
  @ApiProperty({ example: 'Central Market' })
  name: string;

  @ApiProperty({ example: 'Av. Siempre Viva 742' })
  ubication: string;

  @ApiPropertyOptional({ example: 'La mejor tienda del centro' })
  description?: string;
}

export class UpdateStoreDTO {
  @ApiPropertyOptional({ example: 'Central Market' })
  name?: string;

  @ApiPropertyOptional({ example: 'Av. Siempre Viva 742' })
  ubication?: string;

  @ApiPropertyOptional({ example: 'La mejor tienda del centro' })
  description?: string;
}

export class StoreResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ubication: string;

  @ApiProperty({ required: false })
  description?: string;
}

export class StoreListResponse {
  @ApiProperty()
  items: StoreResponse[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export class AddStoreProductDTO {
  @ApiProperty({ example: 'c9a6b7a8-1234-4bcd-9eef-1234567890ab' })
  productId: string;

  @ApiProperty({ example: 899.99 })
  price: number;

  @ApiProperty({ example: 25 })
  stock: number;
}

export class StoreProductResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  category: string;
}

export class StoreProductsListResponse {
  @ApiProperty()
  items: StoreProductResponse[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export class UpdateStoreProductDTO {
  @ApiPropertyOptional({ example: 799.99 })
  price?: number;

  @ApiPropertyOptional({ example: 30 })
  stock?: number;
}
