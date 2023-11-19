import { type Request, type Response } from "express";
import { type RobotStructure, type RobotsRepository } from "../types";
import robotsMock from "../../mocks/robotsMock.js";
import RobotsController from "./RobotsController.js";

describe("Given a RobotController getRobots method", () => {
  describe("When it receives a response", () => {
    const robots: RobotStructure[] = robotsMock;
    const robotsRepository: RobotsRepository = {
      getRobots: jest.fn().mockResolvedValue(robots),
    };

    const robotsController = new RobotsController(robotsRepository);

    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then it should call its method with a status 200", async () => {
      const expectedStatusCode = 200;

      await robotsController.getRobots(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method with Cyborg and Terminator", async () => {
      const expectedRobots = robots;

      await robotsController.getRobots(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ robots: expectedRobots });
    });
  });
});
