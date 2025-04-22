import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(){
    return 'create Product';
  }

  @Get()
  findAllProducts(){
    return 'this return all products'
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
