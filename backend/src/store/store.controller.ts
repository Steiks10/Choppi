import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { AddStoreProductDTO, CreateStoreDTO, StoreListResponse, StoreProductsListResponse, StoreResponse, UpdateStoreDTO, UpdateStoreProductDTO } from './dto/store.dto';

@ApiTags('stores')
@Controller('stores')
export class StoreController {
  constructor(private readonly service: StoreService) {}

  @Get()
  @ApiOkResponse({ type: StoreListResponse })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'q', required: false, type: String, description: 'Buscar por nombre' })
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('q') q?: string,
  ): Promise<StoreListResponse> {
    return this.service.findAll(parseInt(page, 10), parseInt(limit, 10), q);
  }

  @Get(':id')
  @ApiOkResponse({ type: StoreResponse })
  findById(@Param('id') id: string): Promise<StoreResponse> {
    return this.service.findById(id);
  }

  @Post()
  @ApiOkResponse({ type: StoreResponse })
  create(@Body() dto: CreateStoreDTO): Promise<StoreResponse> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOkResponse({ type: StoreResponse })
  update(@Param('id') id: string, @Body() dto: UpdateStoreDTO): Promise<StoreResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  // StoreProducts
  @Post(':id/products')
  addProduct(@Param('id') storeId: string, @Body() dto: AddStoreProductDTO) {
    return this.service.addProduct(storeId, dto);
  }

  @Get(':id/products')
  @ApiOkResponse({ type: StoreProductsListResponse })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'q', required: false, type: String, description: 'Buscar por nombre de producto' })
  @ApiQuery({ name: 'inStock', required: false, type: Boolean, example: true })
  listProducts(
    @Param('id') storeId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('q') q?: string,
    @Query('inStock') inStock?: string,
  ): Promise<StoreProductsListResponse> {
    const inStockBool = inStock === 'true';
    return this.service.listProducts(storeId, parseInt(page, 10), parseInt(limit, 10), q, inStockBool);
  }

  @Put(':id/products/:storeProductId')
  updateStoreProduct(
    @Param('id') storeId: string,
    @Param('storeProductId') storeProductId: string,
    @Body() dto: UpdateStoreProductDTO,
  ) {
    return this.service.updateStoreProduct(storeId, storeProductId, dto);
  }

  @Delete(':id/products/:storeProductId')
  deleteStoreProduct(@Param('id') storeId: string, @Param('storeProductId') storeProductId: string) {
    return this.service.deleteStoreProduct(storeId, storeProductId);
  }
}
