import { setupWorker } from 'msw';
import { boardHandlers } from './handlers/board';
import { postHandlers } from './handlers/post';

export const worker = setupWorker(...boardHandlers, ...postHandlers);
