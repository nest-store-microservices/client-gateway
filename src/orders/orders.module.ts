import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [OrdersController],
  imports:[
    NatsModule
  ],
  providers: [],
  /* imports: [
     ClientsModule.register([
          { 
            name: ORDER_SERVICE, 
            transport: Transport.NATS,
            options:{
            servers: envs.NATS_SERVER,
            } 
          },
        ]),
  ] */
})
export class OrdersModule {}
