import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const PATH_TO_DB = process.env.DB_PATH || '';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const REQUIRED_FIELDS = { USERNAME: 'username', AGE: 'age', HOBBIES: 'hobbies' };

export const MSG = {
  INCORRECT_URL: { message: 'Incorrect url or id' },
  USER_NOT_FOUND: { message: 'User Not Found' },
  INTERNAL_SERVER_ERROR: { message: 'Error on the server side' },
  INCORRECT_FIELDS: { message: 'Incorrect fields or types' },
  USER_DELETED: { message: 'User was successfully deleted' },
};
