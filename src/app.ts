import http from 'http';

import { serviceController } from './services';
import { PORT } from './constants';

export const init = () => {
  const server = http.createServer(serviceController);

  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};
