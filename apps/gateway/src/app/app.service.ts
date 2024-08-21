import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('PRODUCER_SERVICE') private readonly client: ClientProxy
  ) {}

  getData(): Observable<string> {
    const pattern = { endpoint: '/api/producer/hello' };
    const payload = 'Hello Baby!';
    return this.client.send<string>(pattern, payload);
  }
}
