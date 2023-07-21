import { EnqueueStrategy, log } from 'crawlee';
import { DefaultHandlerType } from '../types/default-handler.type';
import { replaceSlashWithUnderscoreUtil } from '../../utils/replace-slash-with-underscore.util';

export const defaultHandler: DefaultHandlerType = async ({
  request,
  saveSnapshot,
  enqueueLinks,
}) => {
  log.info(`Processing ${request.url}...`);

  const { host, pathname } = new URL(request.url);
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

  await enqueueLinks({ strategy: EnqueueStrategy.SameHostname });
};
