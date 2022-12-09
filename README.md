# CRUD API

API which have the ability to create , read , update and delete entities from a database


## Instractions:

- Make sure that you have v18 LTS Node installed on your computer
- `git clone` https://github.com/ivanKoliada/CRUD-API
- Open your newly created folder with your code editor
- Checkout `crud-api` branch
- Type `npm i` to install all dependencies.
## Starting app

To start application in development mode run command `npm run start:dev`.

To start application in production mode run command `npm run start:prod`. 

Run `npm run multi` to starts multiple instances of your application using the Node.js Cluster API.
In memory database `sharing between app instances`.

To run test use `npm run test`.

## Dependencies:

**Bootstrap:** ts-node, cross-env, nodemon

**Code formatting:** eslint, prettier

**Development:** typescript

**Utils:** dotenv, uuid

**Test:** jest, supertest

## Implementation details:

### Implemented endpoint `api/users`:
- **GET** `api/users` is used to get all persons
    - Server should answer with `status code` **200** and all users records

- **GET** `api/users/${userId}` 
    - Server should answer with `status code` **200** and and record with `id === userId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

- **POST** `api/users` is used to create record about new user and store it in database
    - Server should answer with `status code` **201** and newly created record
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

- **PUT** `api/users/{userId}` is used to update existing user
    - Server should answer with` status code` **200** and updated record
    - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist

- **DELETE** `api/users/${userId}` is used to delete existing user from database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Users are stored as `objects` that have following properties:
- `id` — unique identifier (`string`, `uuid`) generated on server side
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

#### Requests to non-existing endpoints (e.g. `some-non/existing/resource`) should be handled (server should answer with `status code` **404** and corresponding human-friendly message)

#### Errors on the server side that occur during the processing of a request handled and processed correctly (server answers with `status code` **500** and corresponding human-friendly message)
