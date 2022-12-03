import { IncomingMessage, ServerResponse } from 'http';

import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers';
import { ENDPOINT, METHODS, STATUS } from '../constants';

export const serviceController = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === ENDPOINT && request.method === METHODS.GET) {
    getUsers(response);
  } else if (
    request.url?.match(
      /\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
    ) &&
    request.method === METHODS.GET
  ) {
    const id = request.url.split('/')[3];

    getUser(response, id);
  } else if (request.url === ENDPOINT && request.method === METHODS.POST) {
    createUser(request, response);
  } else if (
    request.url?.match(
      /\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
    ) &&
    request.method === METHODS.PUT
  ) {
    const id = request.url.split('/')[3];

    updateUser(request, response, id);
  } else if (
    request.url?.match(
      /\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
    ) &&
    request.method === METHODS.DELETE
  ) {
    const id = request.url.split('/')[3];

    deleteUser( response, id);
  } else {
    response.writeHead(STATUS.BAD_REQUEST, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify({ message: 'Incorrect url' }));
  }
};
