import "dotenv/config";
import chalk from "chalk";
import express from "express";

const app = express();

app.disable("x-powered-by");

const port = process.env.PORT ?? 4000;

export const startServer = (port: number) => {
  app.listen(port, () => {
    console.log(chalk.magenta(`Listening on http://localhost:${port}`));
  });
};

export default app;
