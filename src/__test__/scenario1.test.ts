import { readDatabase } from '../database';

import { DEFAULT_DB  as database} from '../constants';

import request from 'supertest';

import { server } from './';
import { TUser } from '../types';


describe('scenario one', () => {
  it('should get all users', async () => {
    const { statusCode, body } = await request(server).get('/api/users');

    expect(statusCode).toEqual(200);
    expect(body).toEqual(database);
  });

  it('should get user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const { statusCode, body } = await request(server).get(`/api/users/${userId}`);

    expect(statusCode).toEqual(200);
    expect(body).toEqual(database.find((user) => user.id === userId));
  });

  it('should get deleted user', async () => {
    const userId = (database.at(-1) as TUser).id;
    const { statusCode, noContent } = await request(server).delete(`/api/users/${userId}`);

    expect(statusCode).toBe(204);
    expect(noContent).toBeTruthy();
  });

  it('should create new user', async () => {
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
});
