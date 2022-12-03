export type TUser = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type TUserBody = Omit<TUser, 'id'>;
