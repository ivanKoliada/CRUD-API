export type TUser = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type TUserBody = Omit<TUser, 'id'>;

// export enum ESTATUS {
//   OK = 200,
//   CREATED= 201,
//   NO_CONTENT= 204,
//   BAD_REQUEST= 400,
//   NOT_FOUND= 404,
// };
