import { IncomingMessage, ServerResponse } from 'http';

import * as User from '../models';
import { STATUS } from '../constants';
import { TUser } from '../types';

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
    const user = 

    
  } catch (error) {
    console.log(error);
  }
};