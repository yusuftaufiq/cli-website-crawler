import { router } from '../crawl.routes';

export type DefaultHandlerType = Parameters<
  (typeof router)['addDefaultHandler']
>[0];
