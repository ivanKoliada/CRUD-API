import { IncomingMessage, ServerResponse } from 'http';

import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers';
import { validateUrl } from '../utils';
import { ENDPOINT, METHODS, STATUS } from '../constants';

export const serviceController = async (request: IncomingMessage, response: ServerResponse) => {
  const isUrlValid = validateUrl(request);
  const id = request.url?.split('/')[3] as string;

  if (request.url === ENDPOINT && request.method === METHODS.GET) {
    getUsers(response);
  } else if (isUrlValid && request.method === METHODS.GET) {
    getUser(response, id);
  } else if (request.url === ENDPOINT && request.method === METHODS.POST) {
    createUser(request, response);
  } else if (isUrlValid && request.method === METHODS.PUT) {
    updateUser(request, response, id);
  } else if (isUrlValid && request.method === METHODS.DELETE) {
    deleteUser(response, id);
  } else {
    response.writeHead(STATUS.BAD_REQUEST, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify({ message: 'Incorrect url' }));
  }
};
