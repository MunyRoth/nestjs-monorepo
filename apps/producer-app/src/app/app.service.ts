import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Author, authors } from '../../db/author';
import { eq } from 'drizzle-orm';

@Injectable()
export class AppService {
  constructor(
    @Inject('HELLO_SERVICE') private readonly client: ClientProxy,
    @Inject('QUERY_CLIENT') private readonly db: PostgresJsDatabase
  ) {}

  sendNotification(message: string): string {
    this.client.emit('hello', message);
    return message;
  }

  async getData(): Promise<Author> {
    const author = await this.db
      .select()
      .from(authors)
      .where(eq(authors.id, 1))
      .execute();
    return author[0];
  }
}
