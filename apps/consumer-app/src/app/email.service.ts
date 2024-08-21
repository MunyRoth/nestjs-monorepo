import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public send(): void {
    this.mailerService
      .sendMail({
        to: 'stevenkakoreal@gmail.com', // list of receivers
        subject: 'Testing Nest Mailer module with template ✔',
        // template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        // context: {
          // Data to be sent to template engine.
          // code: 'cf1a3f828287',
          // username: 'john doe',
        // },
      })
      .then(() => {
        console.log('Email sent');
      })
      .catch((e) => {
        console.log('Email failed', e);
      });
  }
}
