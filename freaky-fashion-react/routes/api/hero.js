const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    image: "hero.jpg",
    heading: "Hero",
  });
});

module.exports = router;