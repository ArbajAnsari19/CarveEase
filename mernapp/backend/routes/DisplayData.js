const express = require("express");
const router = express.Router();
// const User = require("../models/User");

router.get("/fooditems", async (req, res) => {
  try {
    res.send([global.food_items, global.food_categ]);
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
