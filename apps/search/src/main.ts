import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(SearchModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: configService.get('TCP_PORT') },
  });
  const globalPrefix = 'api/search';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.HTTP_PORT || 3002;
  await app.listen(port);
  Logger.log(
    `🚀 Search app is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
