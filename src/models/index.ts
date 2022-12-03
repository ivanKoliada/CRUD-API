import { database } from "../database";
import { TUser } from "../types";

export const findAll = () => database

export const findById = (id: string): TUser | undefined => database.find((item) => item.id === id)
