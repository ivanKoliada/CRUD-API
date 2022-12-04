import { IncomingMessage } from 'http';



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
