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
import { AddKeywordToArticleDTO, CreateMappingDTO } from '@lib';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/create')
  createKeywords(@Body() payload: CreateMappingDTO) {
    return this.searchService.create(payload);
  }

  @Get('/get')
  search(@Query('keyword') keyword: string) {
    return this.searchService.search(keyword);
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
