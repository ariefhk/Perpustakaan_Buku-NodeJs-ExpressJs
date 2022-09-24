// Route.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const bookRoutes = require("./Books.js");
router.use(bookRoutes);

// Locate the file
var path = require("path");
const dataPath = path.resolve("db", "books.json");

// Utility Function
// Save book data function
const saveBookData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

// Add book data function
const getBookData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Create an Account
bookRoutes.post("/book/addbook", (req, res) => {
  let existBook = getBookData();
  const newBookId = Math.floor(1000 + Math.random() * 9000); //generate unique id

  existBook[newBookId] = req.body;
  saveBookData(existBook);
  res.send({ succes: true, msg: "book added succesfully!" });
});

// Read all account form json file
bookRoutes.get("/book/list", (req, res) => {
  const books = getBookData();
  res.send(books);
});

// Update - use put
bookRoutes.put("/book/:id", (req, res) => {
  let existBooks = getBookData();
  fs.readFile(
    dataPath,
    "utf8",
    (err, data) => {
      const bookId = req.params["id"];
      existBooks[bookId] = req.body;
      saveBookData(existBooks);
      res.send({
        succes: true,
        msg: `book with id ${bookId} has been updated!`,
      });
    },
    true
  );
});

// delete
bookRoutes.delete("/book/delete/:id", (req, res) => {
  fs.readFile(
    dataPath,
    "utf-8",
    (err, data) => {
      let existBooks = getBookData();
      const bookId = req.params["id"];
      delete existBooks[bookId];
      saveBookData(existBooks);
      res.send({
        succes: true,
        msg: `book with id ${bookId} has been deleted`,
      });
    },
    true
  );
});

module.exports = router;
