import { EnqueueLinksOptions, EnqueueStrategy, log } from 'crawlee';
import { DefaultHandlerType } from '../types/default-handler.type';
import { replaceSlashWithUnderscoreUtil } from '../../utils/replace-slash-with-underscore.util';
import { Robot } from 'robots-parser';

const enqueueOptions = (
  origin: string,
  robotsParsers: Map<string, Robot>,
  skippedUrls: Set<string>,
): EnqueueLinksOptions => ({
  selector: 'a',
  strategy: EnqueueStrategy.SameHostname,
  transformRequestFunction(req) {
    const { origin: enqueueOrigin } = new URL(req.url);

    if (skippedUrls.has(req.url)) {
      return false;
    }

    if (
      enqueueOrigin === origin &&
      robotsParsers.get(origin)?.isDisallowed(req.url)
    ) {
      log.info(
        `Skipping ${req.url} because this URL is disallowed from robots.txt`,
      );

      skippedUrls.add(req.url);

      return false;
    }

    return req;
  },
});

export const defaultHandler = (
  robotsParsers: Map<string, Robot>,
): DefaultHandlerType => {
  const skippedUrls = new Set<string>();

  return async ({ request, saveSnapshot, enqueueLinks }) => {
    log.info(`Processing ${request.url}...`);

    const { host, pathname, origin } = new URL(request.url);
    const keyValueStoreName = replaceSlashWithUnderscoreUtil(host);
    const key =
      pathname === '/'
        ? keyValueStoreName
        : replaceSlashWithUnderscoreUtil(pathname);

    await saveSnapshot({
      saveHtml: true,
      saveScreenshot: false,
      key,
      keyValueStoreName,
    });

    await enqueueLinks(enqueueOptions(origin, robotsParsers, skippedUrls));
  };
};
