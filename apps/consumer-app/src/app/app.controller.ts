import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('hello')
  getNotifications(data: string) {
    console.log('Received message', data);
    this.emailService.send();
    return data;
  }
}
