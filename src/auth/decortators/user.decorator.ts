import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log('User decorator', request.user);
    if (!request.user) {
      throw new InternalServerErrorException('User Not Found, please check the auth decorator');
    }

    return request.user;
  },
);