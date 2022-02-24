module.exports = function (conf) {
  const websrvConfig = conf.webserver;
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const fs = require("fs");

  const internalRouter = require("./routes/internalRouter");

  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/internal", internalRouter);
  // app.get("/config", (req, res) => {
  //   // let files = [];
  //   // fs.readdirSync(conf.jsste.paths.files).forEach((file) => {
  //   //   files.push(file);
  //   // });
  //   res.json(conf);
  // });

  app.slisten = function (cb) {

    app.listen(websrvConfig.port, websrvConfig.host, () => {cb(websrvConfig.host, websrvConfig.port);});
  };

  return app;
};
