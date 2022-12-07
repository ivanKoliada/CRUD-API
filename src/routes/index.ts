import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import * as User from '../models';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers';
import { getId, validateRouteWithId, validateRoute, sendResponseMessage } from '../helpers';
import { METHODS } from '../constants';
import { MSG, STATUS } from '../types';

export const routes = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const isRouteValid = validateRoute(request);
    const isRouteWithIdValid = validateRouteWithId(request);
    const id = getId(request);
    const user = await User.getById(id);

    if (!isRouteValid) {
      return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_URL);
    }
    if (isRouteWithIdValid && !user) {
      return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.USER_NOT_FOUND);
    }
    if (isRouteValid && !id && request.method === METHODS.GET) {
      return getUsers(response);
    }
    if (isRouteWithIdValid && request.method === METHODS.GET) {
      return getUser(response, id);
    }
    if (isRouteValid && !id && request.method === METHODS.POST) {
      return createUser(request, response);
    }
    if (isRouteWithIdValid && request.method === METHODS.PUT) {
      return updateUser(request, response, id);
    }
    if (isRouteWithIdValid && request.method === METHODS.DELETE) {
      return deleteUser(response, id);
    }
    if (!isRouteWithIdValid) {
      return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_ID);
    }
  } catch (error) {
    sendResponseMessage(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};
