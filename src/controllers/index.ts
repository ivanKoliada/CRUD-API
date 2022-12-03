import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../models';
import { getPostData } from '../utils';
import { STATUS } from '../constants';

//route GET /api/users
export const getUsers = (response: ServerResponse) => {
  try {
    const users = User.findAll();

    response.writeHead(STATUS.OK, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

//route GET /api/users/id
export const getUser = (response: ServerResponse, id: string) => {
  try {
    const user = User.findById(id);

    if (!user) {
      response.writeHead(STATUS.NOT_FOUND, {
        'content-type': 'application/json',
      });
      response.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      response.writeHead(STATUS.OK, {
        'content-type': 'application/json',
      });
      response.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
};

//route POST /api/users
export const createUser = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const body = (await getPostData(request)) as any;
    const newUser = User.create(body);

    response.writeHead(STATUS.CREATED, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

//route PUT /api/users/id
export const updateUser = async (
  request: IncomingMessage,
  response: ServerResponse,
  id: string,
) => {
  try {
    const user = User.findById(id);

    if (!user) {
      response.writeHead(STATUS.NOT_FOUND, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      const { username, age, hobbies } = (await getPostData(request)) as any;

      const userData = {
        username: username || user?.username,
        age: age || user?.age,
        hobbies: hobbies || user?.hobbies,
      };

      const updateUser = User.update(id, userData);

      response.writeHead(STATUS.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(updateUser));
    }
  } catch (error) {
    console.log(error);
  }
};

//route DELETE /api/users/id
export const deleteUser = (
  response: ServerResponse,
  id: string,
) => {
  try {
    const user = User.findById(id);

    if (!user) {
      response.writeHead(STATUS.NOT_FOUND, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      User.remove(id);

      response.writeHead(STATUS.NO_CONTENT, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'User deleted' }));
    }
  } catch (error) {
    console.log(error);
  }
};
