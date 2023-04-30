import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();
import connect from "./db.mjs";
import admin from "./routes/admin.mjs";
import books from "./routes/books.mjs";
connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get(`/`, (req, res) => {
  res.send("Api is running Correctly");
});
app.use("/api/admin", admin);
app.use("/api/books", books);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT: ${process.env.PORT}`);
});
