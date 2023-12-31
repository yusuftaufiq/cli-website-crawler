import { CrawlService } from './crawl.service';
import {
  Command,
  CommandRunner,
  Option,
  OptionChoiceFor,
} from 'nest-commander';
import { CrawlOptionsInterface } from './interfaces/crawl-options.interface';
import { CrawlOptionsDto } from './dto/crawl-options.dto';
import { DEFAULT_TARGETS } from './constants/default-targets.constant';
import { LOG_LEVEL } from './constants/log-level.constant';

@Command({
  name: 'crawl',
  arguments: '[targets]',
  description:
    'Recursively crawl data from whole pages on websites and save the results to HTML output',
  argsDescription: {
    targets:
      'Target URLs separated by a space with valid HTTP protocols. ' +
      '(default: https://cmlabs.co/ https://www.sequence.day/ https://yusuftaufiq.com)',
  },
})
export class CrawlCommand extends CommandRunner {
  constructor(private readonly crawlService: CrawlService) {
    super();
  }

  async run(params: string[], options: CrawlOptionsInterface) {
    const targets =
      params.length === 0 ? DEFAULT_TARGETS : this.parseTargets(params);
    const logLevel =
      typeof options.logLevel === 'string'
        ? this.parseLogLevel(options.logLevel)
        : options.logLevel;
    const crawlOptions = new CrawlOptionsDto({
      ...options,
      logLevel,
      targets,
    });

    this.crawlService.crawl(crawlOptions);
  }

  parseTargets(targets: string[]) {
    const urlPattern = /^(https?:\/\/)/i;
    const isValid = targets.every((value) => urlPattern.test(value));

    if (isValid === false) {
      throw new Error(`[targets] should be valid urls with http protocol`);
    }

    return targets;
  }

  @Option({
    flags: '--log-level <log-level>',
    defaultValue: 'info',
    name: 'logLevel',
    choices: true,
    description: 'Control the verbosity of log messages',
  })
  parseLogLevel(option: string) {
    const index = LOG_LEVEL.findIndex((level) => level === option);

    if (index === -1) {
      throw new Error(
        `<--log-level> should be one of the following choices: ${LOG_LEVEL}`,
      );
    }

    return index;
  }

  @OptionChoiceFor({ name: 'logLevel' })
  getLogLevelChoices() {
    return LOG_LEVEL;
  }

  @Option({
    flags: '--max-concurrency <max-concurrency>',
    defaultValue: 15,
    description: 'Sets the maximum concurrency (parallelism) for the crawl',
  })
  parseMaxConcurrency(maxConcurrency: string) {
    const value = Number(maxConcurrency);

    if (isNaN(value) === true) {
      throw new Error(`<--max-concurrency> should be a number`);
    }

    return value;
  }

  @Option({
    flags: '--max-requests <max-requests>',
    defaultValue: 50,
    description:
      'Maximum number of pages that the crawler will open. ' +
      'The crawl will stop when this limit is reached. ' +
      'This value should always be set in order to prevent infinite loops in misconfigured crawlers.',
  })
  parseMaxRequests(maxRequests: string) {
    const value = Number(maxRequests);

    if (isNaN(value) === true) {
      throw new Error(`<--max-requests> should be a number`);
    }

    return value;
  }

  @Option({
    flags: '--timeout <timeout>',
    defaultValue: 30,
    description: 'Timeout by which the function must complete, in seconds.',
  })
  parseTimeout(timeout: string) {
    const value = Number(timeout);

    if (isNaN(value) === true) {
      throw new Error(`<--timeout> should be a number`);
    }

    return value;
  }

  @Option({
    flags: '--headful',
    defaultValue: false,
    description: 'Whether to run browser in headful mode.',
  })
  parseHeadful() {
    return true;
  }
}
