export type TUser = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type TUserBody = Omit<TUser, 'id'>;

export enum STATUS {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum MSG {
  INCORRECT_URL = 'Incorrect url or id',
  USER_NOT_FOUND = 'User Not Found',
  INTERNAL_SERVER_ERROR = 'Error on the server side',
  INCORRECT_FIELDS = 'Incorrect fields or types',
  USER_DELETED=  'User was successfully deleted',
};
