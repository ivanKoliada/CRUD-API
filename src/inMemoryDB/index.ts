import { TEST_DB } from '../constants';
import { TUser } from '../types';

const users: TUser[] = process.env.TEST ? TEST_DB : [];

export let db = { users };

export const updateDb = (data: TUser[]) => {
  db.users = data;
  return db;
};
