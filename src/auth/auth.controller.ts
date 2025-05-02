import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_CLIENT } from 'src/config';

import { LoginDto, RegisterDto } from './dtos';
import { catchError } from 'rxjs';
import { Request } from 'express';
import { AuthGuard } from './guard/auth.guard';
import { Token, User } from './decortators';
import { CurrentUser } from './interfaces/current-user.interfaces';

@Controller('auth')
export class AuthController {
   constructor(
      @Inject(NATS_CLIENT) private readonly client: ClientProxy
    ) {}

    @Post('login')
    login( @Body() loginDto: LoginDto) {
      return this.client.send('auth.login', loginDto)
                  .pipe(
                    catchError( err => {
                      throw new RpcException(err)
                    })
                  )
    }


    @Post('register')
    register(@Body() registerDto: RegisterDto) {
      return this.client.send('auth.register', registerDto)
              .pipe(
                catchError( err => {
                  throw new RpcException(err)
                })
              )
    }

    @UseGuards(AuthGuard)
    @Get('validate-token')
    refreshToken(@User() user: CurrentUser, @Token() token: string) {

      return {
        user,
        token
      }
     // return this.client.send('auth.verify', {})
    }

}
