import { database } from '../database';

import { v4 as uuid } from 'uuid';

import { TUser, TUserBody } from '../types';

export const findAll = () => {
  return database;
};

export const findById = (id: string): TUser | undefined => {
  return database.find((item) => item.id === id);
};

export const create = (user: TUserBody) => {
  const newUser = { id: uuid(), ...user };

  database.push(newUser);
  return newUser;
};

export const update = (id: string, user: TUserBody) => {
  const index = database.findIndex((item) => item.id === id);
  database[index] = { id, ...user };

  return database[index];
};

export const remove = (id: string) => {
  const index = database.findIndex((item) => item.id === id);

  database.splice(index, 1);
};
