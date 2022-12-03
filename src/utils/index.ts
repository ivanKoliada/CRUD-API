import { IncomingMessage } from 'http';

export const validateUrl = (request: IncomingMessage) => {
  return request.url?.match(
    /\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  );
};

export const getPostData = (request: IncomingMessage) => {
  return new Promise<void>((resolve, reject) => {
    try {
      let body = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });

      request.on('end', async () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};
