import { Router } from "express";
import UsersController from "../controller/UsersController.js";
import UsersMongooseRepository from "../repository/UsersMongooseRepository.js";

export const userRouter = Router();

const userRepository = new UsersMongooseRepository();
const userController = new UsersController(userRepository);

userRouter.post("/login", userController.loginUser);
