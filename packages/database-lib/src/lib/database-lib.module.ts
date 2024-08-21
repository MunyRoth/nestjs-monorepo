import { DynamicModule, Global, Module } from '@nestjs/common';
import postgres from 'postgres';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(databaseUrl: string): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'QUERY_CLIENT',
          useValue: postgres(databaseUrl),
        },
      ],
      exports: ['QUERY_CLIENT'],
    };
  }
}
