import http from 'http';

import { routes } from './routes';
import { PORT } from './constants';

export const init = () => {
  const server = http.createServer(routes);

  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });

  process.on('SIGINT', () => {
    server.close(() => {
      process.exit(0);
    });
  });

  return server;
};
