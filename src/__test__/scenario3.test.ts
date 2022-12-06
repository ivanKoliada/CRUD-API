import { readDatabase } from '../database';

import { DEFAULT_DB as database } from '../constants';

import request from 'supertest';

import { server } from '.';
import { MSG } from '../constants';
import { TUser } from '../types';

describe('scenario three', () => {
  it('should get user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const { statusCode, ok } = await request(server).get(`/api/users/${userId}`);

    expect(statusCode).toEqual(200);
    expect(ok).toBeTruthy();
  });

  it('should not get updated user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const user = database.find((user) => user.id === userId);
    const updateUser = {
      username: user?.username,
      age: user?.age,
      hobbies: ['blogging'],
      animal: 'dog',
    };

    const { statusCode, text } = await request(server).put(`/api/users/${userId}`).send(updateUser);

    expect(statusCode).toBe(400);
    expect(text).toMatch(MSG.INCORRECT_FIELDS.message);
  });

  it('should get updated user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const user = database.find((user) => user.id === userId);
    const updateUser = {
      username: user?.username,
      age: 50,
      hobbies: ['blogging'],
    };

    const { statusCode, body, ok } = await request(server)
      .put(`/api/users/${userId}`)
      .send(updateUser);

    expect(statusCode).toBe(200);
    expect(ok).toBeTruthy();
    expect(body.age).toEqual(50);
  });

  it('should not get deleted user', async () => {
    const userId = (database.at(-10) as TUser)?.id;
    const { badRequest, statusCode } = await request(server).delete(`/api/users/${userId}`);

    expect(statusCode).toBe(400);
    expect(badRequest).toBeTruthy();
  });

  it('should not get all users', async () => {
    const { statusCode, text } = await request(server).get('/api/allUsers');

    expect(statusCode).toEqual(400);
    expect(text).toMatch(MSG.INCORRECT_URL.message);
  });
});
