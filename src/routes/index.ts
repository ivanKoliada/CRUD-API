import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../services';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers';
import { getId, validateRouteWithId, validateRoute, sendResponseMessage } from '../helpers';
import { METHODS } from '../constants';
import { MSG, STATUS } from '../types';

export const routes = (request: IncomingMessage, response: ServerResponse) => {
  try {
    const isRouteValid = validateRoute(request);
    const isRouteWithIdValid = validateRouteWithId(request);
    const id = getId(request);
    const user = User.getById(id);

    switch (request.method) {
      case METHODS.GET:
        if (!isRouteValid) {
          return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.INCORRECT_URL);
        }
        if (isRouteWithIdValid && user) {
          return getUser(response, id);
        }
        if (isRouteWithIdValid && !user) {
          return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.USER_NOT_FOUND);
        }
        if (!id) {
          return getUsers(response);
        }
        return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_ID);
      case METHODS.POST:
        if (!isRouteValid || id) {
          return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.INCORRECT_URL);
        }
        return createUser(request, response);
      case METHODS.PUT:
        if (!isRouteValid) {
          return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.INCORRECT_URL);
        }
        if (isRouteWithIdValid && !user) {
          return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.USER_NOT_FOUND);
        }
        if (isRouteWithIdValid && user) {
          return updateUser(request, response, id);
        }
        return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_ID);
      case METHODS.DELETE:
        if (!isRouteValid) {
          return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.INCORRECT_URL);
        }
        if (isRouteWithIdValid && !user) {
          return sendResponseMessage(response, STATUS.NOT_FOUND, MSG.USER_NOT_FOUND);
        }
        if (isRouteWithIdValid && user) {
          return deleteUser(response, id);
        }
        return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_ID);

      default:
        return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_METHOD);
    }
  } catch (error) {
    sendResponseMessage(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};
