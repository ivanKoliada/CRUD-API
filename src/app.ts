import http, {STATUS_CODES} from 'http';

import { database } from './database';

import { PORT } from './constants';

export const init = () => {
  const server = http.createServer((request, response) => {
    if (request.url === '/api/users') {
      request.on('data', (chunk) => {
        console.log(chunk.toString())
      })
      response.writeHead(200, STATUS_CODES[404] , {
        'content-type': 'application/json',
      });
      response.end(JSON.stringify(database));
    }

  });

  server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};
