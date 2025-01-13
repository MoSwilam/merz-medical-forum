import { Injectable } from '@nestjs/common';
import { message } from '@lib';

@Injectable()
export class AppService {
  getHello() {
    return { message };
  }
}
