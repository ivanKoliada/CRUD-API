import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

import { TUser } from '../types';
import { DB_PATH, DEFAULT_DB } from '../constants';

const pathToFile = join(__dirname, DB_PATH);

export const readDatabase = async (): Promise<TUser[]> => {
  const readableStream = createReadStream(pathToFile);
  let data = '';

  return new Promise((resolve, reject) => {
    readableStream.on('readable', () => {
      try {
        const chunk = readableStream.read();
        if (chunk) {
          data += chunk;
        }
        const result = JSON.parse(data);
        resolve(result);
      } catch (error) {
        reject();
      }
    });
  });
};

export const writeDatabase = async (data: TUser[]) => {
  const writableStream = createWriteStream(pathToFile, { flags: 'w+' });

  writableStream.write(JSON.stringify(data));
};

export const restoreDatabase = async () => {
  const data = JSON.stringify(DEFAULT_DB);
  createWriteStream(pathToFile, { flags: 'w+' }).write(data);
};
