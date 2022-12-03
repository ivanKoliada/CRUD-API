import { ServerResponse } from 'http';

import { STATUS, TMessage, TUser } from '../types';

export const sendResponse = (
  response: ServerResponse,
  status: STATUS,
  body: TUser[] | TUser | TMessage,
) => {
  response.writeHead(status, {
    'content-type': 'application/json',
  });
  response.end(JSON.stringify(body));
};
