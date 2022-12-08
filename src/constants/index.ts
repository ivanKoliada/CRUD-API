import 'dotenv/config';

export const PORT = process.env.PORT || 4000;

export const DB_PATH = process.env.DB_PATH || '';

export const REQUIRED_FIELDS = { USERNAME: 'username', AGE: 'age', HOBBIES: 'hobbies' };

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};
