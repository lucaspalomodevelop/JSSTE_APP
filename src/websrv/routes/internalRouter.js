const conf = require("../../helper/conf")();
const express = require("express");
const router = express.Router();

router.get("/conf", (req, res) => {
  console.log(conf);
  res.json(conf);
});

module.exports = router;
