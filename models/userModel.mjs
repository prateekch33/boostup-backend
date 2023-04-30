import mongoose from "mongoose";

const users = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("userModel", users);
export default userModel;
