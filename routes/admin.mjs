import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.mjs";
import jwtverify from "../middlewares/jwtVerify.mjs";
import dotenv from "dotenv";
dotenv.config();
const admin = express.Router();

admin.post("/register", async (req, res) => {
  var { name, email, password } = req.body;
  let passwordHash = "";
  await bcrypt
    .genSalt(10)
    .then(async (salt) => {
      await bcrypt
        .hash(password, salt)
        .then((hash) => {
          passwordHash = hash;
        })
        .catch((err) => {
          return res.status(400).json({ status: -1, error: err.message });
        });
    })
    .catch((err) => {
      res.status(400).json({ status: -1, error: err.message });
    });
  var data = new userModel({
    name: name,
    email: email,
    password: passwordHash,
  });

  await data
    .save()
    .then(() => {
      return res.status(200).json({ status: 0 });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

admin.post("/login", async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  await userModel
    .findOne({ email: email })
    .then(async (result) => {
      await bcrypt
        .compare(password, result.password)
        .then((isMatch) => {
          if (isMatch) {
            let data = { id: result._id };
            let auth_token = jwt.sign(data, process.env.JWT_TOKEN);
            return res.status(200).json({ status: 0, auth_token });
          } else {
            return res
              .status(401)
              .json({ status: -1, error: "Wrong Password" });
          }
        })
        .catch((err) => {
          return res.status(401).json({ status: -1, error: err.message });
        });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

admin.get("/adminshow", jwtverify, async (req, res) => {
  var id = req.userid;
  await userModel
    .findOne({ _id: id })
    .then((result) => {
      return res.status(200).json({ status: 0, name: result.name });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

export default admin;
