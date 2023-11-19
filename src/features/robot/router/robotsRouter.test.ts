import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { type RobotStructure } from "../types";
import connectToDatabase from "../../../database";
import Robot from "../model/Robot";
import robotsMock from "../../mocks/robotsMock";
import app from "../../../server/app";
import "../../../server/index";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoUrl = server.getUri();
  await connectToDatabase(mongoUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given a GET method with a '/killerRobots' endpoint", () => {
  describe("When it receices a request", () => {
    test("Then it should respond with a status 200 and a list of robots 'Cyborg' and 'Terminator'", async () => {
      const expectedStatusCode = 200;
      const path = "/killerRobots";
      await Robot.create(robotsMock);

      const response = await request(app).get(path).expect(expectedStatusCode);
      const responseBody = response.body as { robots: RobotStructure[] };

      responseBody.robots.forEach((robot, robotPosition) => {
        expect(robot).toHaveProperty("name", robotsMock[robotPosition].name);
      });
    });
  });
});
