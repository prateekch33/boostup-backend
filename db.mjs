import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_URL;

const connect = async () => {
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Database Not Connected");
    });
};

export default connect;
