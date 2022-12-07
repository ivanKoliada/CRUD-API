import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { MSG, STATUS, TUser } from '../types';

export const getId = (request: IncomingMessage) => {
  return request.url?.split('/')[3] as string;
};

export const validateRoute = (request: IncomingMessage) => {
  return request.url?.match(/\/api\/users\/?.*/);
};

export const validateRouteWithId = (request: IncomingMessage) => {
  return request.url?.match(
    /\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  );
};

export const sendResponseBody = (
  response: ServerResponse,
  status: STATUS,
  body: TUser[] | TUser,
) => {
  response.writeHead(status, {
    'content-type': 'application/json',
  });
  response.end(JSON.stringify(body));
};

export const sendResponseMessage = (response: ServerResponse, status: STATUS, message: MSG) => {
  response.writeHead(status, {
    'content-type': 'application/json',
  });
  response.end(JSON.stringify({ code: response.statusCode, message }));
};
