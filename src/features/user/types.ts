import { type Request } from "express";

export interface UserStructure {
  _id: string;
  name: string;
  password: string;
  username: string;
}

export type UserCredentialsStructure = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;

export interface UserWithoutPassword {
  _id: string;
  name: string;
  username: string;
}
