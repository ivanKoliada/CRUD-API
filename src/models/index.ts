import { v4 as uuid } from 'uuid';

import { TUserBody } from '../types';
import { db } from '../inMemoryDB';

export const getAll = () => {
  return db.users;
};

export const getById = (id: string) => {
  return db.users.find((item) => item.id === id);
};

export const create = (user: TUserBody) => {
  const newUser = { id: uuid(), ...user };

  db.users.push(newUser);

  process.send?.(db.users);

  return newUser;
};

export const update = (id: string, user: TUserBody) => {
  const index = db.users.findIndex((item) => item.id === id);

  db.users[index] = { id, ...user };

  process.send?.(db.users);

  return db.users[index];
};

export const remove = (id: string) => {
  const index = db.users.findIndex((item) => item.id === id);

  db.users.splice(index, 1);

  process.send?.(db.users);
};
