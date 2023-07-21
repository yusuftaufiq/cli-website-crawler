import { router } from '../crawl.routes';

export type DefaultHandlerType = Parameters<
  ReturnType<typeof router>['addDefaultHandler']
>[0];
