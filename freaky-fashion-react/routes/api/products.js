const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Database = require("better-sqlite3");

// Database setup
const db = new Database("./db/freakyfashion.db", { verbose: console.log });

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Save to /public/images
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ✅ GET /api/products – Fetch all products
router.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM products");
  const products = stmt.all();
  res.json(products);
});

// ✅ POST /api/products – Add new product
router.post("/", upload.single("image"), (req, res) => {
  const { name, description, brand, sku, price, publicationDate } = req.body;
  const imageFile = req.file;

  // Validation: check required fields
  if (!name || !description || !brand || !sku || !price || !publicationDate || !imageFile) {
    return res.status(400).json({ message: "Alla fält måste fyllas i." });
  }

  // ✅ SKU format validation: AAA111
  if (!sku.match(/^[A-Za-z]{3}\d{3}$/)) {
    return res.status(400).json({ message: "SKU-formatet är felaktigt. Exempel: AAA111" });
  }

  // ✅ Save image path
  const imagePath = `/images/${imageFile.filename}`;

  // ✅ Generate slug (e.g. "cool-shirt")
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  try {
    const insert = db.prepare(`
      INSERT INTO products (name, description, image, brand, sku, price, publicationDate, slug, isNew)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      name,
      description,
      imagePath,
      brand,
      sku,
      price,
      publicationDate,
      slug,
      1 // isNew = true
    );

    res.status(201).json({ message: "Produkten har lagts till!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Något gick fel vid sparning av produkten." });
  }
});

module.exports = router;