import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ProductsController } from './products.controller';
import { envs, NATS_CLIENT } from 'src/config';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports:[
    NatsModule
  ]
  /* imports:[
    ClientsModule.register([
      { 
        name: NATS_CLIENT, 
        transport: Transport.NATS,
        options:{
         servers: envs.NATS_SERVER,
        } 
      },
    ]),
  ] */
})
export class ProductsModule {}
