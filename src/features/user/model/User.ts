import { Schema, model } from "mongoose";
import { type UserStructure } from "../types";

const userSchema = new Schema<UserStructure>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    mingleght: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 8,
  },
});

const User = model("User", userSchema, "users");

export default User;
