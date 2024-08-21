import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import * as process from 'node:process';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      // template: {
      //   dir: __dirname + '/templates', // Directory where your Pug templates are stored
      //   adapter: new EjsAdapter({
      //     inlineCssEnabled: true,
      //   }),
      //   options: {
      //     strict: true, // Enable strict mode for Pug templates
      //   },
      // },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
