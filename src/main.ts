import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exeptions/rpc-custom-exception.filter';

async function bootstrap() {

  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new RpcCustomExceptionFilter() )

  app.useGlobalPipes(new ValidationPipe({     
    whitelist: true,
    forbidNonWhitelisted: true,
   }));
 

  await app.listen( envs.PORT );
  logger.log(`GATEWAY is running on: http://localhost:${envs.PORT}`);
}
bootstrap();
