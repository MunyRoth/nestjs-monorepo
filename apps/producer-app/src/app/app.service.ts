import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Sql } from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Author, authors } from '../../db/author';

@Injectable()
export class AppService {
  constructor(
    @Inject('HELLO_SERVICE') private readonly client: ClientProxy,
    @Inject('QUERY_CLIENT') private readonly sql: Sql
  ) {}

  db = drizzle(this.sql);

  sendNotification(message: string): string {
    this.client.emit('hello', message);
    return message;
  }

  async getData(): Promise<Author[]> {
    return await this.db.select().from(authors).execute();
  }
}
