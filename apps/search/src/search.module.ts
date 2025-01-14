import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { DatabaseModule } from '@lib';
import { keywordEntityProvider } from './keywords.entity';
import { ArticleEntityProvider } from './articles.entity';

@Module({
  imports: [DatabaseModule],
  controllers: [SearchController],
  providers: [
    SearchService,
    ...keywordEntityProvider,
    ...ArticleEntityProvider,
  ],
})
export class SearchModule {}
