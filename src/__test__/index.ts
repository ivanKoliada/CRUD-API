import http from 'http';

import { serviceController } from '../services';

export const server = http.createServer(serviceController);