import { repositories } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { KeywordEntity } from './keywords.entity';

@Injectable()
export class SearchService {
  constructor(
    @Inject(repositories.KEYWORD_REPO)
    private keywordRepo: Repository<KeywordEntity>,
  ) {}

  async create(data: KeywordEntity): Promise<KeywordEntity> {
    return this.keywordRepo.save(data);
  }

  async get() {
    return await this.keywordRepo.find();
  }
}
