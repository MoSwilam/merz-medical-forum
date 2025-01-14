import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  createKeywords(@Body() keywords: any) {
    return this.searchService.create(keywords);
  }

  @Get()
  get() {
    return this.searchService.get();
  }
}
