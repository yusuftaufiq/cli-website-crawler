import { createPlaywrightRouter } from 'crawlee';
import { defaultHandler } from './handlers/default.handler';
import { RouterType } from './types/router.type';

export const router = ({ robotsParsers }: RouterType) => {
  const playwrightRouter = createPlaywrightRouter();

  playwrightRouter.addDefaultHandler(defaultHandler(robotsParsers));

  return playwrightRouter;
};
