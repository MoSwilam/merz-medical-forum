import { CreateMappingDTO, repositories } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { KeywordEntity } from './keywords.entity';
import { ArticleEntity, ArticleType } from './articles.entity';

@Injectable()
export class SearchService {
  constructor(
    @Inject(repositories.KEYWORD_REPO)
    private keywordRepo: Repository<KeywordEntity>,
    @Inject(repositories.ARTICLE_REPO)
    private articleRepo: Repository<ArticleEntity>,
  ) {}

  async create(data: CreateMappingDTO): Promise<any> {
    const { terms, article } = data;
    const keywords = this.keywordRepo.create({ terms });
    const savedKeyWords = await this.keywordRepo.save(keywords);

    const articleDoc = this.articleRepo.create({
      type: ArticleType.TEXT,
      content: article,
      keywords: [savedKeyWords],
    });

    return await this.articleRepo.save(articleDoc);
  }

  async get() {
    const searchTerm = 'two';

    return await this.articleRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.keywords', 'keyword')
      .where('keyword.terms @> ARRAY[:...searchTerms]', {
        searchTerms: [searchTerm],
      })
      .getMany();
  }

  async getAll() {
    return await this.articleRepo.find();
  }

  async getSearchTerms() {
    return await this.keywordRepo.find();
  }
}
