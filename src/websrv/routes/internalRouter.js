const conf = require("../../helper/conf")();
const express = require("express");
const router = express.Router();

const jssteState = { statusMSG: "could not started JSSTE", status: 1 };
const websrvState = { port: 5000, status: 1 };

router.get("/conf", (req, res) => {
  console.log(conf);
  res.json(conf);
});

router.get("/jsste/status", (req, res) => {
  res.json(jssteState);
});
router.get("/websrv/status", (req, res) => {
  res.json(websrvState);
});

module.exports = router;
