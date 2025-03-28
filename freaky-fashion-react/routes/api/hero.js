const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    image: "/images/hero.jpg",
    heading: "Hero",
  });
});

module.exports = router;