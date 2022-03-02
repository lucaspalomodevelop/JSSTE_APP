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

  app.slisten = function (cb) {

    app.listen(websrvConfig.port, websrvConfig.host, () => {cb(websrvConfig.host, websrvConfig.port);});
  };

  return app;
};
