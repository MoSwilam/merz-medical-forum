import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'SEARCH_SERVICE',
        useFactory: (configService: ConfigService) => {
          const host = configService.get('SEARCH_SERVICE_HOST');
          const port = configService.get('SEARCH_SERVICE_PORT');

          console.log(`SEARCH_SERVICE_HOST: ${host}`);
          console.log(`SEARCH_SERVICE_PORT: ${port}`);

          return {
            transport: Transport.TCP,
            options: {
              host: 'search-app', //configService.get('SEARCH_SERVICE_HOST'),
              port: 3021, // configService.get('SEARCH_SERVICE_PORT'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
