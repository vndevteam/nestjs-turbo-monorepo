import { Controller, Get } from '@nestjs/common';
import { ApiPublic } from '@repo/api/decorators/http.decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiPublic()
  getHello(): string {
    return this.appService.getHello();
  }
}
