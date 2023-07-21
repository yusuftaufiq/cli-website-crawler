import { createPlaywrightRouter } from 'crawlee';
import { defaultHandler } from './handlers/default.handler';

export const router = createPlaywrightRouter();

router.addDefaultHandler(defaultHandler);
