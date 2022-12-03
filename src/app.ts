import http, {STATUS_CODES} from 'http';

import { database } from './database';

import { PORT } from './constants';
import { serviceController } from './services/indx';

export const init = () => {
  const server = http.createServer(serviceController);

  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};
