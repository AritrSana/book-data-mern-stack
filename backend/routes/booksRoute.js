/** @format */
import express from "express";
import { Book } from "./../models/bookModels.js";

const router = express.Router();

router.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.findById({ _id: id });
    return res.status(200).json({
      books,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate({ _id: id }, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found!" });
    }

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found!" });
    }

    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
