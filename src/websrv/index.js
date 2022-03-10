module.exports = function (conf) {
  const websrvConfig = conf.webserver;
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const cors = require("cors");
  const fs = require("fs");

  const internalRouter = require("./routes/internalRouter");

  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/api", internalRouter);

  app.slisten = function (cb) {
    app.ServerInstance = app.listen(
      websrvConfig.port,
      websrvConfig.host,
      () => {
        cb(websrvConfig.host, websrvConfig.port);
      }
    );
  };

  /**
   * @function
   * @name close
   * @description
   * Stops the server
   */
  app.close = function () {
    app.ServerInstance.close();
  };

  return app;
};
