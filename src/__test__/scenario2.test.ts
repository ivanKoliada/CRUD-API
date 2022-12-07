import request from 'supertest';

import { DEFAULT_DB as database } from '../constants';

import { server } from '.';
import { readDatabase } from '../database';
import { TUser, MSG } from '../types';

describe('scenario two', () => {
  let deletedUser = '';

  it('should not get user by non-uuid id', async () => {
    const { statusCode, text } = await request(server).get(`/api/users/non-uuid`);

    expect(statusCode).toEqual(400);
    expect(text).toMatch(MSG.INCORRECT_ID);
  });

  it('should get deleted user', async () => {
    const userId = (database.at(-1) as TUser).id;

    deletedUser = userId;
    const { statusCode, ok } = await request(server).delete(`/api/users/${userId}`);

    expect(statusCode).toBe(204);
    expect(ok).toBeTruthy();
  });

  it('should get all users', async () => {
    const { statusCode, body } = await request(server).get('/api/users');

    expect(statusCode).toEqual(200);
    expect(body).toHaveLength(5);
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
