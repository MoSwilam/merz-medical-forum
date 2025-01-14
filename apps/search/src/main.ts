import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(SearchModule);
  const globalPrefix = 'api/search';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3002;
  await app.listen(port);
  Logger.log(
    `🚀 Search app is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
