import { Injectable } from '@nestjs/common';
import { BrowserErrorHandler, PlaywrightCrawler, log } from 'crawlee';
import { router } from './crawl.routes';
import { CrawlOptionsDto } from './dto/crawl-options.dto';
import { RobotsService } from '../robots/robots.service';

@Injectable()
export class CrawlService {
  constructor(private readonly robotsService: RobotsService) {}

  async crawl({
    targets,
    logLevel,
    maxConcurrency,
    maxRequests: maxRequestsPerCrawl,
    timeout,
    headful,
  }: CrawlOptionsDto) {
    log.setLevel(logLevel);

    const robotsParsers = await this.robotsService.parseFrom(targets);
    const crawler = new PlaywrightCrawler({
      headless: !headful,
      minConcurrency: 5,
      maxConcurrency,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: timeout,
      maxRequestsPerCrawl,
      requestHandler: router({ robotsParsers }),
      failedRequestHandler: this.onFailedRequest,
    });

    await crawler.addRequests(targets);
    await crawler.run();

    log.info(
      `Crawling finished, all HTML data saved to ./storage/key_value_stores directory.`,
    );
  }

  private onFailedRequest: BrowserErrorHandler = ({ request }) => {
    log.warning(`Request ${request.url} failed.`);
  };
}
