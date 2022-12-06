import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import * as User from '../models';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers';
import {
  sendResponseBody,
  getId,
  validateUrl,
  validateEndpoint,
  sendResponseMessage,
} from '../helpers';
import { METHODS } from '../constants';
import { MSG, STATUS } from '../types';

export const routes = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const isEndpointValid = validateEndpoint(request);
    const isUrlValid = validateUrl(request);
    const id = getId(request);
    const user = await User.getById(id);

    if (validate(id) && !user) {
      return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.USER_NOT_FOUND);
    }
    if (isEndpointValid && request.method === METHODS.GET) {
      return getUsers(response);
    }
    if (isUrlValid && request.method === METHODS.GET) {
      return getUser(response, id);
    }
    if (isEndpointValid && request.method === METHODS.POST) {
      return createUser(request, response);
    }
    if (isUrlValid && request.method === METHODS.PUT) {
      return updateUser(request, response, id);
    }
    if (isUrlValid && request.method === METHODS.DELETE) {
      return deleteUser(response, id);
    }

    return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_URL);
  } catch (error) {
    sendResponseMessage(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};
