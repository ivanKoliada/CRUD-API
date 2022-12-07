import { writeDatabase } from '../database';

import { v4 as uuid } from 'uuid';

import {  TUserBody } from '../types';
import { readDatabase } from '../database';

export const getAll = async () => {
  const db = await readDatabase();
  return db;
};

export const getById = async (id: string) => {
  const db = await readDatabase();

  return db.find((item) => item.id === id);
};

export const create = async (user: TUserBody) => {
  const newUser = { id: uuid(), ...user };
  const db = await readDatabase();

  db.push(newUser);

  writeDatabase(db);

  return newUser;
};

export const update = async (id: string, user: TUserBody) => {
  const db = await readDatabase();
  const index = db.findIndex((item) => item.id === id);
  db[index] = { id, ...user };

  await writeDatabase(db);

  return db[index];
};

export const remove = async (id: string) => {
  const db = await readDatabase();
  const index = db.findIndex((item) => item.id === id);

  db.splice(index, 1);

  await writeDatabase(db);
};
