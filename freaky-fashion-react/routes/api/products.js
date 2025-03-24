const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("./db/freakyfashion.db", { verbose: console.log });

// GET all products
router.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM products");
  const products = stmt.all();
  res.json(products);
});

module.exports = router;