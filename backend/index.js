/** @format */

import express from "express";
import { MONGO_URI, PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(booksRoute);

app.get("/", (req, res) => {
  res.status(200).send("Server is running..");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to mongoDB!"))
  .catch((err) => console.log(err));
