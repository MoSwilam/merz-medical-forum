import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(@Query('keywords') keywords: string) {
    return this.authService.getHello(keywords);
  }

  @Get('health')
  getHealth() {
    return 'OK';
  }
}
