import { Injectable } from '@nestjs/common';
import { message } from '@lib';

@Injectable()
export class NotificationsService {
  getHello() {
    return { message };
  }
}
