import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  send() {
    return this.appService.sendNotification('Hello RabbitMQ!');
  }

  @Get('data')
  getData() {
    return this.appService.getData();
  }
}
