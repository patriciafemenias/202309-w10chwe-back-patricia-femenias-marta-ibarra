import { type Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import {
  type UserCredentialsStructure,
  type UserWithoutPassword,
} from "../types";
import type UsersMongooseRepository from "../repository/UsersMongooseRepository";
import UsersController from "./UsersController";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a UsersController's loginUser method", () => {
  const req: Pick<UserCredentialsStructure, "body"> = {
    body: {
      username: "Martirio",
      password: "OleLosCaracoles666",
    },
  };
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When it receives a request with a valid username and password", () => {
    const expectedStatusCode = 200;
    const user: UserWithoutPassword = {
      _id: "",
      name: "",
      username: "Martirio",
    };
    const userRepository: Pick<UsersMongooseRepository, "getUser"> = {
      getUser: jest.fn().mockResolvedValue(user),
    };

    const token = "874RIUDFKJESD";
    jwt.sign = jest.fn().mockReturnValue({ token });

    test("Then it should call the response's status method with status code 200", async () => {
      const res: Pick<Response, "status" | "json"> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const usersController = new UsersController(userRepository);
      await usersController.loginUser(
        req as UserCredentialsStructure,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its JSON method of the response with the token '874RIUDFKJESD'", async () => {
      const usersController = new UsersController(userRepository);

      await usersController.loginUser(
        req as UserCredentialsStructure,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith({ token: { token } });
    });
  });

  describe("When it receives a request with an invalid username and password", () => {
    const expectedWrongStatusCode = 401;

    const userRepository: Pick<UsersMongooseRepository, "getUser"> = {
      getUser: jest.fn().mockRejectedValue("error"),
    };
    const usersController = new UsersController(userRepository);

    const token = "874RIUDFKJESD";
    jwt.sign = jest.fn().mockReturnValue({ token });

    test("Then it should call the status method of the response with status code 401", async () => {
      await usersController.loginUser(
        req as UserCredentialsStructure,
        res as Response,
      );

      expect(res.status).toHaveBeenCalledWith(expectedWrongStatusCode);
    });

    test("Then it should call its JSON method of the response with the error message 'User not found'", async () => {
      const expectedErrorMessage = { error: "User not found" };

      await usersController.loginUser(
        req as UserCredentialsStructure,
        res as Response,
      );

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});
