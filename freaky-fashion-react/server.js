const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const productsApi = require("./routes/api/products");
app.use("/api/products", productsApi);
const heroApi = require("./routes/api/hero");
app.use("/api/hero", heroApi);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});