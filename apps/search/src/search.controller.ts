import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateMappingDTO } from '@lib';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/create')
  createKeywords(@Body() payload: CreateMappingDTO) {
    return this.searchService.create(payload);
  }

  @Get('')
  get() {
    return this.searchService.get();
  }
}
