import { Schema, model } from "mongoose";
import { type RobotStructure } from "../types";

const robotSchema = new Schema<RobotStructure>({
  name: {
    type: String,
    required: true,
  },
  movie: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  endurance: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Robot = model("Robot", robotSchema, "killerRobots");

export default Robot;
