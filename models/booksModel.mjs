import mongoose from "mongoose";

const books = mongoose.Schema({
  name: String,
  author: String,
  description: String,
});

const booksModel = mongoose.model("booksModel", books);
export default booksModel;
