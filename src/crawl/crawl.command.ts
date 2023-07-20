import { CrawlService } from './crawl.service';
import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'crawl' })
export class CrawlCommand extends CommandRunner {
  constructor(private readonly crawlService: CrawlService) {
    super();
  }

  async run(passedParams: string[], options?: Record<string, any>) {
    console.info(this.crawlService.getHello());
  }
}
