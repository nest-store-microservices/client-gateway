import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(){
    return 'create Product';
  }

  @Get()
  findAllProducts( @Query() paginationDto:PaginationDto ){
    return this.productsClient.send({ cmd: 'find_all_products' }, {
      limit: paginationDto.limit,
      page: paginationDto.page
    })
  }

  @Get(':id')
  findProducts(@Param('id') id:string){
    return 'this return this product ' + id
  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string){
    return 'this delete product ' + id
  }

  @Patch(':id')
  updateProduc(
      @Param('id') id:string,
      @Body() body : any
    ){
    return 'this update the product ' + id
  }


}
