import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateMappingDTO } from '@lib';

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
}
