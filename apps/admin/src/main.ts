import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });
  const globalPrefix = 'api/admin';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.HTTP_PORT || 3000;

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new CatchEverythingFilter());

  await app.startAllMicroservices();
  app.listen(port);
  Logger.log(
    `🚀 Admin app is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
