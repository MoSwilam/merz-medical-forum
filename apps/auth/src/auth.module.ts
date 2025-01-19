import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_FILTER } from '@nestjs/core';
import { MicroserviceExceptionsFilter, NetworkExceptionFilter } from '@lib';
import { HttpExceptionsFilter } from '@lib';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'SEARCH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('SEARCH_SERVICE_HOST'),
            port: configService.get('SEARCH_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MicroserviceExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NetworkExceptionFilter,
    },
    AuthService,
  ],
})
export class AuthModule {}
