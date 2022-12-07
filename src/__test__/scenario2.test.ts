import { readDatabase, writeDatabase } from '../database';

import request from 'supertest';

import { server } from '.';
import { TUser, MSG } from '../types';

let initialDatabase = [] as TUser[];
let database = [] as TUser[];

describe('scenario two', () => {
  beforeAll(async () => {
    database = await readDatabase();
    initialDatabase = [...database];
  });

  afterAll(async () => {
    await writeDatabase(initialDatabase);
  });  

  it('should get incorrect id', async () => {
    const { statusCode, text } = await request(server).get(`/api/users/non-uuid`);

    expect(statusCode).toEqual(400);
    expect(text).toMatch(MSG.INCORRECT_ID);
  });

  it('should get deleted user', async () => {
    const userId = (database.at(-1) as TUser).id;

    const { statusCode, noContent } = await request(server).delete(`/api/users/${userId}`);

    database = database.filter(item => item.id !== userId)

    expect(statusCode).toBe(204);
    expect(noContent).toBeTruthy();
  });

  it('should get all users', async () => {
    const { statusCode, body } = await request(server).get('/api/users');

    expect(statusCode).toEqual(200);
    expect(body).toEqual(database);
  });

  it('should get user not found', async () => {
    const userId = (database[0] as TUser).id;    
    await request(server).delete(`/api/users/${userId}`);

    const { statusCode, text } = await request(server).get(`/api/users/${userId}`);

    expect(statusCode).toEqual(404);
    expect(text).toMatch(MSG.USER_NOT_FOUND);
  });

  it('should get incorrect required fields', async () => {
    const newUser = {
      username: 'Charley',
      hobbies: ['Reading books'],
    };

    const { statusCode, text } = await request(server).post(`/api/users`).send(newUser);

    expect(statusCode).toBe(400);
    expect(text).toMatch(MSG.INCORRECT_FIELDS);
  });

  it('should get incorrect url', async () => {
    const { statusCode, text } = await request(server).get(`/api/imusers`);

    expect(statusCode).toBe(400);
    expect(text).toMatch(MSG.INCORRECT_URL);
  });
});
