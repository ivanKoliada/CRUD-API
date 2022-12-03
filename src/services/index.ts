import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../models';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers';
import { validateUrl } from '../utils';
import { ENDPOINT, METHODS } from '../constants';
import { STATUS } from '../types';
import { sendResponse } from '../helpers';

export const serviceController = async (request: IncomingMessage, response: ServerResponse) => {
  const isUrlValid = validateUrl(request);
  const id = request.url?.split('/')[3] as string;
  const user = User.findById(id);

  if (!user) {
    sendResponse(response, STATUS.NOT_FOUND, { message: 'User Not Found' });
  } else if (request.url === ENDPOINT && request.method === METHODS.GET) {
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
    sendResponse(response, STATUS.BAD_REQUEST, { message: 'Incorrect url' });
  }
};
