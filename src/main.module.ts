import { Module } from '@nestjs/common';
import { CrawlModule } from './crawl/crawl.module';

@Module({
  imports: [CrawlModule],
})
export class MainModule {}
