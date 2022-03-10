const conf = require("../../helper/conf")();
const express = require("express");
const router = express.Router();
const States = require("../../helper/states");
const logger = require("../../helper/logger");

router.get("/conf", (req, res) => {
  res.json(conf);
});

router.get("/jsste/status", (req, res) => {
  res.json(States.JssteState);
});
router.get("/websrv/status", (req, res) => {
  res.json(States.WebsrvState);
});
router.get("/logs", (req, res) => {
  res.json(logger.getCurrentlog());
});

module.exports = router;
