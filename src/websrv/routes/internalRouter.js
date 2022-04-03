let conf = require("../../helper/conf")();
const express = require("express");
const router = express.Router();
const States = require("../../helper/states");
const logger = require("../../helper/logger");

router.get("/conf", (req, res) => {
  conf = require("../../helper/conf")();
  res.json(conf);
});

router.get("/jsste/status", (req, res) => {
  res.json(States.JssteState);
});
router.get("/websrv/status", (req, res) => {
  res.json(States.WebsrvState);
});
router.get("/shortlogs", (req, res) => {
  res.json(logger.getCurrentlog(32));
});
router.get("/logs", (req, res) => {
  res.json(logger.getCurrentlog(64));
});

module.exports = router;
