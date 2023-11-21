import morgan from "morgan";
import express from "express";
import app from "./app.js";
import pingRouter from "../features/ping/router/pingRouter.js";
import robotsRouter from "../features/robot/router/robotsRouter.js";
import { userRouter } from "../features/user/router/userRouter.js";

app.use(morgan("dev"));
app.use(express.json());
app.use("/killerRobots", robotsRouter);
app.use("/", pingRouter);
app.use("/", userRouter);
