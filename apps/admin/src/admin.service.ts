import { SERVICES } from '@lib';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AdminService {
  constructor(
    @Inject(SERVICES.SEARCH_SERVICE)
    private readonly searchClient: ClientProxy,
  ) {}

  async getHello(keywords: string) {
    return await firstValueFrom(this.searchClient.send('search', keywords));
  }
}
