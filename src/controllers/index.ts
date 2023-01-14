import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../services';
import { sendResponseBody, sendResponseMessage } from '../helpers';
import { getPostData, validateBody } from '../utils';
import { MSG, STATUS, TUser } from '../types';

//route GET /api/users
export const getUsers = (response: ServerResponse) => {
  try {
    const users = User.getAll();

    sendResponseBody(response, STATUS.OK, users);
  } catch (error) {
    sendResponseMessage(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};

//route GET /api/users/id
export const getUser = (response: ServerResponse, id: string) => {
  try {
    const user = User.getById(id) as TUser;
    sendResponseBody(response, STATUS.OK, user);
  } catch (error) {
    sendResponseMessage(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};

//route POST /api/users
export const createUser = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const body = await getPostData(request, response);

    if (!validateBody(body) || Object.keys(body).length !== 3) {
      return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_FIELDS);
    }
    const newUser = User.create(body);

    sendResponseBody(response, STATUS.CREATED, newUser);
  } catch (error) {
    sendResponseMessage(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};

//route PUT /api/users/id
export const updateUser = async (
  request: IncomingMessage,
  response: ServerResponse,
  id: string,
) => {
  try {
    const user = User.getById(id) as TUser;
    const data = await getPostData(request, response);

    if (!validateBody(data)) {
      return sendResponseMessage(response, STATUS.BAD_REQUEST, MSG.INCORRECT_FIELDS);
    }

    const { username, age, hobbies } = data;
    const userData = {
      username: username || user?.username,
      age: age || user?.age,
      hobbies: hobbies || user?.hobbies,
    };

    const updateUser = User.update(id, userData);
    sendResponseBody(response, STATUS.OK, updateUser);
  } catch (error) {
    sendResponseMessage(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};

//route DELETE /api/users/id
export const deleteUser = (response: ServerResponse, id: string) => {
  try {
    User.remove(id);

    sendResponseMessage(response, STATUS.NO_CONTENT, MSG.USER_DELETED);
  } catch (error) {
    sendResponseMessage(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};
