import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('HTTP_PORT'),
    },
  });
  const globalPrefix = 'api/auth';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.HTTP_PORT || 3000;
  await app.startAllMicroservices();
  app.listen(port);
  Logger.log(
    `🚀 Auth app is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
