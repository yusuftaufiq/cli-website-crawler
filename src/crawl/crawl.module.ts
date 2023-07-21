import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { CrawlCommand } from './crawl.command';
import { RobotsModule } from '../robots/robots.module';

@Module({
  imports: [RobotsModule],
  providers: [CrawlService, CrawlCommand],
})
export class CrawlModule {}
