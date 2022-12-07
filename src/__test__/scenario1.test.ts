import { readDatabase, writeDatabase } from '../database';

import request from 'supertest';

import { server } from '.';
import { TUser } from '../types';

let initialDatabase = [] as TUser[];
let database = [] as TUser[];

describe('scenario one', () => {
  beforeAll(async () => {
    database = await readDatabase();
    initialDatabase = [...database];
  });

  afterAll(async () => {
    await writeDatabase(initialDatabase);
  });

  it('should get all users', async () => {
    const { statusCode, body } = await request(server).get('/api/users');

    expect(statusCode).toEqual(200);
    expect(body).toEqual(database);
  });

  it('should get user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const { statusCode, ok } = await request(server).get(`/api/users/${userId}`);

    expect(statusCode).toEqual(200);
    expect(ok).toBeTruthy();
  });

  it('should get deleted user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const { statusCode, noContent } = await request(server).delete(`/api/users/${userId}`);

    database = database.filter((item) => item.id !== userId);

    expect(statusCode).toBe(204);
    expect(noContent).toBeTruthy();
  });

  it('should get new user', async () => {
    const newUser = {
      username: 'Charley',
      age: 60,
      hobbies: ['Reading books'],
    };

    const { statusCode, ok } = await request(server).post(`/api/users`).send(newUser);

    expect(statusCode).toBe(201);
    expect(ok).toBeTruthy();
  });

  it('should get updated user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const user = database.find((user) => user.id === userId);
    const updateUser = {
      username: user?.username,
      age: user?.age,
      hobbies: ['blogging'],
    };

    const { statusCode, body } = await request(server).put(`/api/users/${userId}`).send(updateUser);

    expect(statusCode).toBe(200);
    expect(body.hobbies).toContain('blogging');
  });

  it('should get all users', async () => {
    const { statusCode, headers } = await request(server).get('/api/users');

    expect(statusCode).toEqual(200);
    expect(headers['content-type']).toEqual('application/json');
  });
});
