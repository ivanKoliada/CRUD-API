import { IncomingMessage, ServerResponse } from 'http';

import { ENDPOINT, METHODS, STATUS } from '../constants';
import { TUser } from '../types';
import { getUsers, getUser, createUser } from '../controllers';

export const serviceController = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === ENDPOINT && request.method === METHODS.GET) {
    getUsers(request, response);
  } else if (
    request.url?.match(
      /\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
    ) &&
    request.method === METHODS.GET
  ) {
    const id = request.url.split('/')[3];

    getUser(request, response, id);
  } else if (request.url === ENDPOINT && request.method === METHODS.POST) {
    createUser(request, response);
  } else {
    response.writeHead(STATUS.BAD_REQUEST, {
      'content-type': 'application/json',
    });
    response.end(JSON.stringify({ message: 'Incorrect url' }));
  }
};

// const userId = request.url?.split(`${ENDPOINT}\/`).join('') as string;
// const isValidate = validate(userId);
// const isExist = database.find((item) => item.id === userId);
// switch (request.METHODS) {
//   case METHODS.GET:
//     if (request.url === ENDPOINT) {
//       response.writeHead(STATUS.OK, MESSAGE_CODE[200], {
//         'content-type': 'application/json',
//       });
//       response.end(JSON.stringify(database));
//     }

//     if (!isValidate) {
//       response.writeHead(STATUS.BAD_REQUEST, MESSAGE_CODE[400]);
//       response.end();
//     }
//     if (!isExist) {
//       response.writeHead(STATUS.NOT_FOUND, MESSAGE_CODE[404]);
//       response.end();
//     } else {
//       const user = database.find((user) => user.id === userId);

//       response.writeHead(STATUS.OK, MESSAGE_CODE[200], {
//         'content-type': 'application/json',
//       });
//       response.end(JSON.stringify(user));
//     }

//     break;

//   case METHODS.POST:
//     const promise = new Promise<void>((resolve, reject) => {
//       let body = '';

//       request.on('data', (chunk) => (body += chunk));
//       request.on('end', () => {
//         const parsedBody = JSON.parse(body);
//         resolve(parsedBody);
//       });
//     });
//     // const body = await promise;
//     // const newUser: TUser = {
//     //   id: uuid(),
//     //   ...body,
//     // };

//     // if (typeof newUser === TUser) {
//     //   database.push(newUser);
//     //   response.writeHead(STATUS.CREATED, MESSAGE_CODE[201]);
//     //   response.end();
//     // } else {
//     //   response.writeHead(STATUS.NOT_FOUND, MESSAGE_CODE[400]);
//     //   response.end();
//     // }

//     break;

//   case METHODS.PUT:
//     break;

//   case METHODS.DELETE:
//     if (!isValidate) {
//       response.writeHead(STATUS.BAD_REQUEST, MESSAGE_CODE[400]);
//       response.end();
//     }
//     if (!isExist) {
//       response.writeHead(STATUS.NOT_FOUND, MESSAGE_CODE[404]);
//       response.end();
//     } else {
//       const userIdxInDatabase = database.findIndex((user) => user.id === userId);
//       database.splice(userIdxInDatabase, 1);

//       response.writeHead(STATUS.NO_CONTENT, MESSAGE_CODE[204]);
//       response.end();
//     }

//     break;

//   default:
//     response.writeHead(STATUS.INTERNAL_SERVER_ERROR, MESSAGE_CODE[500]);
//     response.end();
//     break;
// }
