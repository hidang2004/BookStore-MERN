const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Book = require("./models/Book");

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// GET tất cả sách
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách sách",
      error: error.message
    });
  }
});

// POST thêm sách
app.post("/api/books", async (req, res) => {
  try {
    const { title, author, price } = req.body;

    const newBook = new Book({
      title,
      author,
      price
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({
      message: "Lỗi khi thêm sách",
      error: error.message
    });
  }
});

// Route kiểm tra server
app.get("/", (req, res) => {
  res.send("Book Store API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});