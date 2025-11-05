import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({ example: 'iPhone 16' })
  name: string;

  @ApiProperty({ example: 'Smartphone de última generación', required: false })
  description?: string;

  @ApiProperty({ example: 999.99 })
  price: number;

  @ApiProperty({ example: 'smartphones' })
  category: string;
}

export class ProductResponse {
  @ApiProperty({ example: 'c9a6b7a8-1234-4bcd-9eef-1234567890ab' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;
}
