import { type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type UsersMongooseRepository from "../repository/UsersMongooseRepository";
import { type UserCredentialsStructure } from "../types";

class UsersController {
  constructor(private readonly userRepository: UsersMongooseRepository) {}

  loginUser = async (req: UserCredentialsStructure, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await this.userRepository.getUser(username, password);
      const userData: JwtPayload = { sub: user._id, name: user.name };
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!);

      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: "User not found" });
    }
  };
}
export default UsersController;
