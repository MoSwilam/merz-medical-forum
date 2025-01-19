import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { DatabaseModule, MicroserviceExceptionsFilter } from '@lib';
import { keywordEntityProvider } from './keywords.entity';
import { ArticleEntityProvider } from './articles.entity';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
// import { AllExceptionsFilter } from '@lib/exception-filters/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    DatabaseModule,
  ],
  controllers: [SearchController],
  providers: [
    SearchService,
    ...keywordEntityProvider,
    ...ArticleEntityProvider,
    {
      provide: APP_FILTER,
      useClass: MicroserviceExceptionsFilter,
    },
  ],
})
export class SearchModule {}
