import { LogLevel } from 'crawlee';

export interface CrawlOptionsInterface {
  logLevel: LogLevel;
  maxConcurrency: number | undefined;
  maxRequests: number | undefined;
  timeout: number | undefined;
  headful: boolean;
}
