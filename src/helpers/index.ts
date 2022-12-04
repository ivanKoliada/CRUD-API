import { IncomingMessage, ServerResponse } from 'http';

import { STATUS, TMessage, TUser } from '../types';

export const getId = (request: IncomingMessage) => {
  return request.url?.split('/')[3] as string;
};

export const validateEndpoint = (request: IncomingMessage) => {
  return request.url ? /^\/api\/users\/?$/.test(request.url) : null;
};

export const validateUrl = (request: IncomingMessage) => {
  return request.url?.match(
    /\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  );
};

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

// /^\/api\/users\/?$/.test('/api/users/');
