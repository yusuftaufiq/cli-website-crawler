import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlService {
  getHello(): string {
    return 'Hello World!';
  }
}
