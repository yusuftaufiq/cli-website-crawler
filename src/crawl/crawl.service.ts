import { Injectable } from '@nestjs/common';
import { BrowserErrorHandler, PlaywrightCrawler, log } from 'crawlee';
import { router } from './crawl.routes';
import { CrawlOptionsDto } from './dto/crawl-options.dto';

@Injectable()
export class CrawlService {
  async crawl({
    targets,
    logLevel,
    maxConcurrency,
    maxRequests: maxRequestsPerCrawl,
    timeout,
    headful,
  }: CrawlOptionsDto) {
    log.setLevel(logLevel);

    const crawler = new PlaywrightCrawler({
      headless: !headful,
      minConcurrency: 5,
      maxConcurrency,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: timeout,
      maxRequestsPerCrawl,
      requestHandler: router,
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
