import { LogLevel } from 'crawlee';
import { CrawlOptionsInterface } from '../interfaces/crawl-options.interface';

export class CrawlOptionsDto implements CrawlOptionsInterface {
  targets: string[];
  logLevel: LogLevel;
  maxConcurrency: number | undefined;
  maxRequests: number | undefined;
  timeout: number | undefined;
  headful: boolean;

  constructor({
    targets,
    logLevel,
    maxConcurrency,
    maxRequests,
    timeout,
    headful,
  }: CrawlOptionsDto) {
    this.targets = targets;
    this.logLevel = logLevel;
    this.maxConcurrency = maxConcurrency;
    this.maxRequests = maxRequests;
    this.timeout = timeout;
    this.headful = headful;
  }
}
