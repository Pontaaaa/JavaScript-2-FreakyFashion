const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const productsApi = require("./routes/api/products");
const heroApi = require("./routes/api/hero");

app.use("/api/products", productsApi);
app.use("/api/hero", heroApi);

app.get("*", (req, res) => {
  res.status(404).send("404: Page not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});