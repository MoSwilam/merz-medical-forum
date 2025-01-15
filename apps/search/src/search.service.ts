import { AddKeywordToArticleDTO, CreateMappingDTO, repositories } from '@lib';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async fetchData() {
    const posts = await fetch('https://dummyjson.com/posts?limit=10');
    const postJson = await posts.json();
    const postsContents = postJson.posts.map((post: any) => {
      return { content: post.body, type: 'text' };
    });
    return await this.articleRepo.insert(postsContents);
  }

  async search(keyword: string) {
    const articleDoc = await this.articleRepo
      .createQueryBuilder('article')
      //.leftJoinAndSelect('article.keywords', 'keyword')
      .innerJoin('article.keywords', 'keyword')
      .where('keyword.terms @> ARRAY[:...searchTerms]', {
        searchTerms: [keyword],
      })
      .getMany();

    if (!articleDoc.length) {
      throw new NotFoundException(`No articles found for keyword ${keyword}`);
    }
    return articleDoc;
  }

  async getAll(): Promise<any> {
    return await this.articleRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.keywords', 'keyword')
      .getMany();
  }

  async getArticles() {
    return await this.articleRepo.find();
  }

  async getSearchTerms() {
    return await this.keywordRepo.find();
  }

  async updateKeywords(
    articleId: number,
    keywordsToAdd: AddKeywordToArticleDTO,
  ) {
    const article = await this.articleRepo.findOne({
      where: { id: articleId },
      relations: ['keywords'],
    });

    if (!article) {
      throw new NotFoundException(`Article with id ${articleId} not found`);
    }

    const { keywords } = article;
    if (
      keywords.some((existingKeyword) =>
        keywordsToAdd.terms.some((newTerm) =>
          existingKeyword.terms.includes(newTerm),
        ),
      )
    ) {
      // At least one of the new terms already exists in one of the associated keywords.
      throw new BadRequestException(
        `One or more of the keywords [${keywordsToAdd.terms.join(', ')}] is already associated with article ${articleId} having content ${article.content}`,
      );
    }

    const keywordsDoc = this.keywordRepo.create({ terms: keywordsToAdd.terms });
    const savedKeyWords = await this.keywordRepo.save(keywordsDoc);

    article.keywords.push(savedKeyWords);
    return await this.articleRepo.save(article);
  }
}
