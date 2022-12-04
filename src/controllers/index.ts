import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../models';
import { sendResponse } from '../helpers';
import { getPostData } from '../utils';
import { STATUS, TUser } from '../types';

//route GET /api/users
export const getUsers = (response: ServerResponse) => {
  try {
    const users = User.getAll();

    sendResponse(response, STATUS.OK, users);
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, { message: 'Internal Server Error' });
  }
};

//route GET /api/users/id
export const getUser = (response: ServerResponse, id: string) => {
  try {
    const user = User.getById(id) as TUser;

    if (!user) {
      sendResponse(response, STATUS.NOT_FOUND, { message: 'User Not Found' });
    } else {
      sendResponse(response, STATUS.OK, user);
    }
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, { message: 'Internal Server Error' });
  }
};

//route POST /api/users
export const createUser = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const body = (await getPostData(request)) as any;
    const newUser = User.create(body);

    sendResponse(response, STATUS.CREATED, newUser);
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, { message: 'Internal Server Error' });
  }
};

//route PUT /api/users/id
export const updateUser = async (
  request: IncomingMessage,
  response: ServerResponse,
  id: string,
) => {
  try {
    const user = User.getById(id);

    if (!user) {
      sendResponse(response, STATUS.NOT_FOUND, { message: 'User Not Found' });
    } else {
      const { username, age, hobbies } = (await getPostData(request)) as any;

      const userData = {
        username: username || user?.username,
        age: age || user?.age,
        hobbies: hobbies || user?.hobbies,
      };

      const updateUser = User.update(id, userData);

      sendResponse(response, STATUS.OK, updateUser);
    }
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, { message: 'Internal Server Error' });
  }
};

//route DELETE /api/users/id
export const deleteUser = (response: ServerResponse, id: string) => {
  try {
    const user = User.getById(id);

    if (!user) {
      sendResponse(response, STATUS.NOT_FOUND, { message: 'User Not Found' });
    } else {
      User.remove(id);

      sendResponse(response, STATUS.NO_CONTENT, { message: 'User deleted' });
    }
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, { message: 'Internal Server Error' });
  }
};
