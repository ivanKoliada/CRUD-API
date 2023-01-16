import { db, } from '../inMemoryDB';

import request from 'supertest';

import { server } from '.';
import { TUser, MSG } from '../types';

let database = db.users as TUser[];

describe('scenario three', () => {

  it('should get user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const user = database.find((item) => item.id === userId);
    const { statusCode, body } = await request(server).get(`/api/users/${userId}`);

    expect(statusCode).toEqual(200);
    expect(body).toEqual(user);
  });

  it('should get incorrect required fields', async () => {
    const userId = (database.at(-1) as TUser).id;
    const updateUser = {
      username: 'qwerty',
      age: 20,
      hobbies: ['blogging'],
      animal: 'dog',
    };

    const { statusCode, text } = await request(server).put(`/api/users/${userId}`).send(updateUser);

    expect(statusCode).toBe(400);
    expect(text).toMatch(MSG.INCORRECT_FIELDS);
  });

  it('should get updated user', async () => {
    const userId = (database[1] as TUser).id;
    const user = database.find((user) => user.id === userId);
    const index = database.findIndex((item) => item.id === userId);
    const updateUser = {
      username: user?.username,
      age: 50,
      hobbies: ['blogging'],
    };

    const { statusCode, body, ok } = await request(server)
      .put(`/api/users/${userId}`)
      .send(updateUser);

    database[index] = body;

    expect(statusCode).toBe(200);
    expect(ok).toBeTruthy();
    expect(body.age).toEqual(50);
  });

  it('should get bad request', async () => {
    const userId = (database.at(-10) as TUser)?.id;
    const { badRequest, statusCode } = await request(server).delete(`/api/users/${userId}`);

    expect(statusCode).toBe(400);
    expect(badRequest).toBeTruthy();
  });

  it('should get incorrect url', async () => {
    const { statusCode, text } = await request(server).get('/api/allUsers');

    expect(statusCode).toEqual(404);
    expect(text).toMatch(MSG.INCORRECT_URL);
  });

  it('should get incorrect required fields ', async () => {
    const user = {
      dream: 'leave belarus',
    };

    const { statusCode, text } = await request(server).post('/api/users').send(user);

    expect(statusCode).toEqual(400);
    expect(text).toMatch(MSG.INCORRECT_FIELDS);
  });
});
