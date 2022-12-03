import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuid } from 'uuid';

import * as User from '../models';
import { STATUS } from '../constants';
import { TUser, TUserBody } from '../types';
import { getPostData } from '../utils';

//route GET /api/users
export const getUsers = (request: IncomingMessage, response: ServerResponse) => {
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
export const getUser = (request: IncomingMessage, response: ServerResponse, id: string) => {
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

//route PUT /api/users
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
