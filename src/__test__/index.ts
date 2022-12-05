import http from 'http';

import { routes } from '../routes';

export const server = http.createServer(routes);
