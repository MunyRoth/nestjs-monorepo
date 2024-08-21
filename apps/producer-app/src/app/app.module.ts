import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '@nestjs-monorepo/database-lib';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'hello_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    DatabaseModule.forRoot(process.env['DRIZZLE_DATABASE_URL']),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
