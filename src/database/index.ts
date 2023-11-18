import chalk from "chalk";
import mongoose from "mongoose";

const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", false);
    console.log(chalk.green("Connected to database"));
  } catch (error) {
    console.log(chalk.red("Not possible to connect to database"));
  }
};

export default connectToDatabase;
