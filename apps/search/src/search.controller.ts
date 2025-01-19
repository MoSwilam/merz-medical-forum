import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';
import {
  AddKeywordToArticleDTO,
  CreateMappingDTO,
  CreateNewArticleDTO,
} from '@lib';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @EventPattern('search')
  async handleSearch(searchKeywords: string) {
    return await this.searchService.search(searchKeywords);
  }

  @Get('health')
  getHealth() {
    return 'OK';
  }

  @Post('/create')
  createMapping(@Body() payload: CreateMappingDTO) {
    return this.searchService.createKeyWordAndArticleAndMapThem(payload);
  }

  @Post('/create-article')
  createArticle(@Body() payload: CreateNewArticleDTO) {
    return this.searchService.createArticle(payload);
  }

  @Get('/get')
  search(@Query('keywords') keyword: string) {
    return this.searchService.search(keyword);
  }

  @Get('/keywords/:id')
  getKeyordsWithAssociatedArticles(@Param('id') id: number) {
    return this.searchService.getKeywordByIdAndAssociatedArticles(id);
  }

  @Get('/article/:id')
  getArticleWithKeywords(@Param('id') id: number) {
    return this.searchService.getArticleWithKeywords(id);
  }

  @Get('/fetch')
  fetchData() {
    return this.searchService.fetchData();
  }

  @Get('/findAll')
  findAll() {
    return this.searchService.getAll();
  }

  @Get('/articles')
  getArticles() {
    return this.searchService.getArticles();
  }

  @Get('/keywords')
  getKeywords() {
    return this.searchService.getSearchTerms();
  }

  @Patch('/:articleId/keywords/add')
  updateKeywords(
    @Body() payload: AddKeywordToArticleDTO,
    @Param('articleId') articleId: number,
  ) {
    return this.searchService.updateKeywords(articleId, payload);
  }
}
