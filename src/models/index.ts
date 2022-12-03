import { database } from '../database';

import { v4 as uuid } from 'uuid';

import { TUser, TUserBody } from '../types';

export const findAll = () => database;

export const findById = (id: string): TUser | undefined => database.find((item) => item.id === id);

export const create = (user: TUserBody) => {
  return new Promise((resolve) => {
    const newUser = { id: uuid(), ...user };

    database.push(newUser);
    resolve(newUser);
  });
};
