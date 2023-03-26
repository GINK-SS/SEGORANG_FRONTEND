import { setupWorker } from 'msw';
import { boardHandlers } from './handlers/board';

export const worker = setupWorker(...boardHandlers);
