import { Router } from "express";
import RobotsController from "../controller/RobotsController.js";
import RobotsMongooseRepository from "../repository/RobotsMongooseRepository.js";

const robotsRouter = Router();

const robotsMongooseRepository = new RobotsMongooseRepository();
const robotsController = new RobotsController(robotsMongooseRepository);

robotsRouter.get("/", robotsController.getRobots);

export default robotsRouter;
