import { v4 as uuid } from 'uuid';
import * as url from 'url';
import { createReadStream, createWriteStream } from 'fs';
import * as path from 'path';

import { TUser } from '../types';
import { PATH_TO_DB } from '../constants';

const pathToFile = path.join(__dirname, PATH_TO_DB);

export const database: TUser[] = [
  {
    id: uuid(),
    username: 'John',
    age: 25,
    hobbies: ['diving', 'swimming'],
  },
  {
    id: uuid(),
    username: 'Noah',
    age: 35,
    hobbies: ['cooking', 'fishing', 'hunting'],
  },
  {
    id: uuid(),
    username: 'Jacob',
    age: 28,
    hobbies: [],
  },
  {
    id: uuid(),
    username: 'Michael',
    age: 31,
    hobbies: ['traveling', 'drawing'],
  },
  {
    id: uuid(),
    username: 'Alexander',
    age: 19,
    hobbies: ['dancing', 'singing'],
  },
  {
    id: uuid(),
    username: 'Adam',
    age: 30,
    hobbies: ['origami'],
  },
];

export const readDatabase = async (): Promise<TUser[]> => {
  const readableStream = createReadStream(pathToFile, );
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
        reject('добавить респонс');
      }
    });
  });
};
