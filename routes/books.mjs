import express from "express";
import booksModel from "../models/booksModel.mjs";
const books = express.Router();

books.get("/bookshow", async (req, res) => {
  var search = req.query.search;
  let toSearch = {};
  if (search !== "") {
    toSearch = { name: search };
  }
  await booksModel
    .find(toSearch)
    .then((result) => {
      let data = result;
      return res.status(200).json({ status: 0, data });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

books.get("/getallbooks", async (req, res) => {
  await booksModel
    .find({})
    .then((result) => {
      let data = result;
      return res.status(200).json({ status: 0, data });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

books.post("/addbooks", async (req, res) => {
  var { name, author, desc } = req.body;
  var data = new booksModel({
    name: name,
    author: author,
    description: desc,
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

books.delete("/deletebook", async (req, res) => {
  var id = req.body.id;
  await booksModel
    .findOneAndDelete({ _id: id })
    .then(() => {
      return res.status(200).json({ status: 0 });
    })
    .catch((err) => {
      return res.status(400).json({ status: -1, error: err.message });
    });
});

export default books;
