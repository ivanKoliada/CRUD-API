import request from 'supertest';

import { server } from '.';
import { readDatabase, restoreDatabase, writeDatabase } from '../database';
import { TUser, MSG } from '../types';

let initialDatabase = [] as TUser[];
let database = [] as TUser[];
let deletedUser = '';

describe('scenario two', () => {
  beforeAll(async () => {
    database = await readDatabase();
    initialDatabase = [...database];
  });

  afterAll(async () => {
    // await writeDatabase(initialDatabase);
    await restoreDatabase();
  });  

  it('should not get user by non-uuid id', async () => {
    const { statusCode, text } = await request(server).get(`/api/users/non-uuid`);

    expect(statusCode).toEqual(400);
    expect(text).toMatch(MSG.INCORRECT_ID);
  });

  it('should get deleted user', async () => {
    const userId = (database[0] as TUser).id;

    deletedUser = userId;
    const { statusCode, ok } = await request(server).delete(`/api/users/${userId}`);

    expect(statusCode).toBe(204);
    expect(ok).toBeTruthy();
  });

  it('should get all users', async () => {
    const { statusCode, ok } = await request(server).get('/api/users');

    expect(statusCode).toEqual(200);
    expect(ok).toBeTruthy();
  });

  it('should not get deleted user', async () => {
    const { statusCode, text } = await request(server).get(`/api/users/${deletedUser}`);

    expect(statusCode).toEqual(404);
    expect(text).toMatch(MSG.USER_NOT_FOUND);
  });

  it('should not create new user', async () => {
    const newUser = {
      username: 'Charley',
      hobbies: ['Reading books'],
    };

    const { statusCode, text } = await request(server).post(`/api/users`).send(newUser);

    expect(statusCode).toBe(400);
    expect(text).toMatch(MSG.INCORRECT_FIELDS);
  });
});
