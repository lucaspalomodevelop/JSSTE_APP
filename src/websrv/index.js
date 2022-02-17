module.exports = function (conf) {
  const websrvConfig = conf.webserver;
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const fs = require("fs");

  app.use(bodyParser.json());
  app.use(cookieParser());

  app.get("/", (req, res) => {
    let files = [];
    fs.readdirSync(conf.jsste.paths.files).forEach((file) => {
      files.push(file);
    });
    res.json(files);
  });

  app.slisten = function (cb) {
    app.listen(websrvConfig.port, websrvConfig.host, cb);
  };

  return app;
};
