import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../models';
import { sendResponse } from '../helpers';
import { getPostData, validateBody } from '../utils';
import { MSG } from '../constants';
import { STATUS, TUser } from '../types';

//route GET /api/users
export const getUsers = async(response: ServerResponse) => {
  try {
    const users = await User.getAll();

    sendResponse(response, STATUS.OK, users);
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};

//route GET /api/users/id
export const getUser = async (response: ServerResponse, id: string) => {
  try {
    const user = await User.getById(id) as TUser;
    sendResponse(response, STATUS.OK, user);
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};

//route POST /api/users
export const createUser = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const body = await getPostData(request, response);

    if (!validateBody(body) || Object.keys(body).length !== 3) {
      return sendResponse(response, STATUS.BAD_REQUEST, MSG.INCORRECT_FIELDS);
    }
    const newUser = await User.create(body);

    sendResponse(response, STATUS.CREATED, newUser);
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};

//route PUT /api/users/id
export const updateUser = async (
  request: IncomingMessage,
  response: ServerResponse,
  id: string,
) => {
  try {
    const user = await User.getById(id) as TUser;
    const data = await getPostData(request, response);

    if (!validateBody(data)) {
      return sendResponse(response, STATUS.BAD_REQUEST, MSG.INCORRECT_FIELDS);
    }

    const { username, age, hobbies } = data;
    const userData = {
      username: username || user?.username,
      age: age || user?.age,
      hobbies: hobbies || user?.hobbies,
    };

    const updateUser = await User.update(id, userData);
    sendResponse(response, STATUS.OK, updateUser);
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};

//route DELETE /api/users/id
export const deleteUser = async (response: ServerResponse, id: string) => {
  try {
    await User.remove(id);

    sendResponse(response, STATUS.NO_CONTENT, MSG.USER_DELETED);
  } catch (error) {
    sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR);
  }
};
