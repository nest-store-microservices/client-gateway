import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { NATS_CLIENT, ORDER_SERVICE } from 'src/config';

import { firstValueFrom } from 'rxjs';

import { OrderPaginationDto } from './dto/pagination-dto';
import { StatusDto } from './dto/status.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_CLIENT) private readonly client: ClientProxy, // Replace 'any' with the actual type of your service
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  findAll( @Query() orderPaginationDto:OrderPaginationDto ) {    
    
   try {
    return this.client.send('findAllOrders',  orderPaginationDto  );
   } catch (error) {
    throw new RpcException(error)
   }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const product = await firstValueFrom(this.client.send('findOneOrder', {
        id
      }))

      return product
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id') 
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body()  statusDto: StatusDto ) 
    {
    try {
      return this.client.send('changeOrderStatus', { id, status: statusDto.status });
    } catch (error) {
      throw new RpcException(error)
    }
  }


}
