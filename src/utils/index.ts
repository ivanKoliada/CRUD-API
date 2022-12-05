import { IncomingMessage, ServerResponse } from 'http';

import { sendResponse } from '../helpers';
import { REQUIRED_FIELDS, MSG } from '../constants';
import { STATUS, TUserBody } from '../types';

export const getPostData = (request: IncomingMessage, response: ServerResponse) => {
  return new Promise<TUserBody>((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', async () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (error) {
        reject(sendResponse(response, STATUS.INTERNAL_SERVER_ERROR, MSG.INTERNAL_SERVER_ERROR));
      }
    });
  });
};

export const validateBody = (data: TUserBody) => {
  return Object.entries(data).every(([key, value]) => validateBodyByField(key, value));
};

const validateBodyByField = (key: string, value: TUserBody[keyof TUserBody]) => {
  if (key === REQUIRED_FIELDS.USERNAME && typeof value === 'string') {
    return true;
  }
  if (key === REQUIRED_FIELDS.AGE && typeof value === 'number') {
    return true;
  }
  if (
    key === REQUIRED_FIELDS.HOBBIES &&
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string')
  ) {
    return true;
  }
  return false;
};
