module.exports = function (conf) {
  const websrvConfig = conf.webserver;
  const express = require("express");
  const app = express();
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const cors = require("cors");
  const fs = require("fs");
  let State = require("../helper/states").WebsrvState;

  const internalRouter = require("./routes/internalRouter");

  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/api", internalRouter);

  app.slisten = function (cb) {
    app.ServerInstance = app
      .listen(websrvConfig.port, websrvConfig.host, () => {
        State.status = 0;
        State.statusMSG = "webserver is running";
        State.port = websrvConfig.port;
        cb(websrvConfig.host, websrvConfig.port);
      })
      .on("error", (err) => {
        State.status = 1;
        State.statusMSG = "webserver could not started";
        console.log(err);
      });
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
