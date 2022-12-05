import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../models';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers';
import { sendResponse, getId, validateUrl, validateEndpoint } from '../helpers';
import { METHODS, MSG } from '../constants';
import { STATUS } from '../types';

export const serviceController = async (request: IncomingMessage, response: ServerResponse) => {
  request.on('error', () => {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  })
  
  const isEndpointValid = validateEndpoint(request);
  const isUrlValid = validateUrl(request);
  const id = getId(request);
  const user = User.getById(id);

  if (id && !user) {
    sendResponse(response, STATUS.NOT_FOUND, MSG.USER_NOT_FOUND);
  } else if (isEndpointValid && request.method === METHODS.GET) {
    getUsers(response);
  } else if (isUrlValid && request.method === METHODS.GET) {
    getUser(response, id);
  } else if (isEndpointValid && request.method === METHODS.POST) {
    createUser(request, response);
  } else if (isUrlValid && request.method === METHODS.PUT) {
    updateUser(request, response, id);
  } else if (isUrlValid && request.method === METHODS.DELETE) {
    deleteUser(response, id);
  } else {
    sendResponse(response, STATUS.BAD_REQUEST, MSG.INCORRECT_URL);
  }
};
