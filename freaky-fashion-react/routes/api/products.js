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

router.get("/search", (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({ message: "Ingen sökterm angiven." });
  }

  try {
    const stmt = db.prepare(`
      SELECT * FROM products
      WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(brand) LIKE ?
    `);
    const results = stmt.all(`%${query}%`, `%${query}%`, `%${query}%`);
    res.json(results);
  } catch (err) {
    console.error("❌ Fel vid sökning:", err);
    res.status(500).json({ message: "Något gick fel vid sökningen." });
  }
});

// ✅ POST /api/products – Add new product
router.post("/", upload.single("image"), (req, res) => {
  console.log("✅ POST /api/products called");
  console.log("🧾 Request body:", req.body);
  console.log("🖼️ Uploaded file:", req.file);

  try {
    const { name, description, brand, sku, price, publicationDate } = req.body;
    const imageFile = req.file;

    if (!name || !description || !brand || !sku || !price || !publicationDate || !imageFile) {
      console.warn("⚠️ Missing field(s)");
      return res.status(400).json({ message: "Alla fält måste fyllas i." });
    }

    if (!sku.match(/^[A-Za-z]{3}\d{3}$/)) {
      return res.status(400).json({ message: "SKU-formatet är felaktigt. Exempel: AAA111" });
    }

    const imagePath = `/images/${imageFile.filename}`;
    const slug = name.toLowerCase().replace(/\s+/g, "-");

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
      1
    );

    console.log("✅ Product inserted successfully");
    return res.status(201).json({ message: "Produkten har lagts till!" });
  } catch (err) {
    console.error("💥 Insert error:", err);
    res.status(500).json({ message: "Något gick fel vid sparning av produkten." });
  }
});

// ✅ DELETE /api/products/:id – Delete a product
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Produkten kunde inte hittas." });
    }

    console.log(`🗑️ Product with ID ${id} deleted`);
    res.status(200).json({ message: "Produkten har raderats." });
  } catch (err) {
    console.error("💥 Delete error:", err);
    res.status(500).json({ message: "Något gick fel vid radering." });
  }
});

router.get("/search", (req, res) => {
  const db = require("../../db"); // If you already initialized it elsewhere, remove this line.
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({ message: "Sökfråga saknas." });
  }

  try {
    const stmt = db.prepare(`
      SELECT * FROM products
      WHERE LOWER(name) LIKE ? OR LOWER(brand) LIKE ?
    `);
    const products = stmt.all(`%${query}%`, `%${query}%`);
    res.json(products);
  } catch (err) {
    console.error("❌ Sökfel:", err);
    res.status(500).json({ message: "Kunde inte hämta sökresultat." });
  }
});

module.exports = router;