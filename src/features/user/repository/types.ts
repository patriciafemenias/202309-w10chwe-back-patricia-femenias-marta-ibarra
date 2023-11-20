import { type UserStructure } from "../types";

export interface UsersMongooseRepositoryStructure {
  getUser: (username: string, password: string) => Promise<UserStructure>;
}

export default UsersMongooseRepositoryStructure;
