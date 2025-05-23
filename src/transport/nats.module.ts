import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_CLIENT, envs } from 'src/config';

@Module({
    imports:[
        ClientsModule.register([
          { 
            name: NATS_CLIENT, 
            transport: Transport.NATS,
            options:{
             servers: envs.NATS_SERVER,
            } 
          },
        ]),
      ],
      exports:[
        ClientsModule.register([
            { 
              name: NATS_CLIENT, 
              transport: Transport.NATS,
              options:{
               servers: envs.NATS_SERVER,
              } 
            },
          ]),
      ]
})
export class NatsModule {
    
}
