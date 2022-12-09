import 'dotenv/config';

export const PORT = process.env.PORT || 4000;

export const REQUIRED_FIELDS = { USERNAME: 'username', AGE: 'age', HOBBIES: 'hobbies' };

export const TEST_DB = [
  {
    id: 'acc6a848-f451-4170-9080-1c8b762cfb83',
    username: 'MockJohn',
    age: 25,
    hobbies: ['diving', 'swimming'],
  },
  {
    id: '3498e508-297b-417b-9892-70f3b1cbb6b8',
    username: 'Noah',
    age: 35,
    hobbies: ['cooking', 'fishing', 'hunting'],
  },
  { id: '8464487e-17ee-478e-ab60-8580160d28f3', username: 'Jacob', age: 28, hobbies: [] },
  {
    id: '88303d02-1111-4f0c-8b86-fc1777762ffa',
    username: 'Michael',
    age: 31,
    hobbies: ['traveling', 'drawing'],
  },
  {
    id: 'f4ab8cc0-4268-4417-b594-4918d12bd2ca',
    username: 'Alexander',
    age: 19,
    hobbies: ['dancing', 'singing'],
  },
  {
    id: 'b5b013b8-500d-4728-b2f8-9afe99129a79',
    username: 'Adam',
    age: 30,
    hobbies: ['origami'],
  },
];

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};
