let conf = require("../../helper/conf")();
const express = require("express");
const router = express.Router();
const States = require("../../helper/states");
const logger = require("../../helper/logger");

router.get("/conf", (req, res) => {
  conf = require("../../helper/conf")();
  res.json(conf);
});

router.get("/jsste/status/obj/:obj", (req, res) => {
  res.json(States.JSSTEState()[req.params.obj]);
});
router.get("/jsste/status", (req, res) => {
  res.json(States.JSSTEState());
});
router.get("/websrv/status", (req, res) => {
  res.json(States.WebserverState());
});

router.get("/logs/length/:leng", (req, res) => {
  res.json(logger.getCurrentlog(req.params.leng));
});
router.get("/logs", (req, res) => {
  res.json(logger.getCurrentlog(-1));
});

module.exports = router;
