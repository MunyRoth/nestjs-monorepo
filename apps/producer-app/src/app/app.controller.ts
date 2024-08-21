import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

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

  @MessagePattern({ endpoint: '/api/producer/hello' })
  async accumulate(payload: string): Promise<string> {
    console.log('Received message:', await this.appService.getData());
    return payload;
  }
}
