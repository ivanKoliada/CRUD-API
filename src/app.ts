import http from 'http';

import { PORT } from './constants';
import { serviceController } from './services';

export const init = () => {
  const server = http.createServer(serviceController);

  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};
