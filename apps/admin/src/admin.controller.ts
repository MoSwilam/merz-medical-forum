import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(@Query('keywords') keywords: string) {
    return this.adminService.getHello(keywords);
  }

  @Get('health')
  getHealth() {
    return 'OK';
  }
}
