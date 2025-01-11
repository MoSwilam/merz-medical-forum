import { Injectable } from '@nestjs/common';
import { message } from '@lib';

@Injectable()
export class AuthService {
  getHello() {
    return { message };
  }
}
