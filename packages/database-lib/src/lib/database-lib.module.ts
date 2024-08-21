import { DynamicModule, Global, Module } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(databaseUrl: string): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'QUERY_CLIENT',
          useValue: drizzle(postgres(databaseUrl)),
        },
      ],
      exports: ['QUERY_CLIENT'],
    };
  }
}
