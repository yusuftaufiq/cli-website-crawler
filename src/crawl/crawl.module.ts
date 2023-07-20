import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CrawlCommand } from './crawl.command';

@Module({
  providers: [CrawlService, CrawlCommand],
})
export class CrawlModule {}
