const express = require("express");
const path = require("path");
const cors = require("cors"); // ✅ Optional but useful for dev

const app = express();

// ✅ Import your API routes
const productsApi = require("./routes/api/products");

// ✅ Middleware
app.use(cors()); // Enable CORS (optional, useful during development)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (like uploaded images)
app.use(express.static(path.join(__dirname, "public")));

// ✅ API route
app.use("/api/products", productsApi);

// ✅ Catch unknown routes (optional but helps with debugging)
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});