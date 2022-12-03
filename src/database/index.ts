import { v4 as uuid } from 'uuid';

import { TUsers } from '../types';

export const database: TUsers[] = [
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