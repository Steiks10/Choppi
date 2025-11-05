import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDTO, ProductResponse } from './dto/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get(':id')
  @ApiOkResponse({ type: ProductResponse })
  getById(@Param('id') id: string): Promise<ProductResponse> {
    return this.service.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: ProductResponse })
  create(@Body() dto: CreateProductDTO): Promise<ProductResponse> {
    return this.service.create(dto);
  }
}
