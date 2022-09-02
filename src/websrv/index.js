const res = require("express/lib/response");

module.exports = function (conf) {
  const websrvConfig = conf.webserver;
  const express = require("express");
  const app = express();
  const http = require("http");
  const server = http.createServer(app);
  const io = require("../helper/socket").init(server);
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const cors = require("cors");
  const fs = require("fs");
  const path = require("path");
  let State = require("../helper/states");
  let jsste = require("../jsste");

  const internalRouter = require("./routes/internalRouter");

  app.dashboardExist = (cb) => {
    let result = fs.existsSync(path.join(__dirname, "../../dashboard/"));
    if (result) {
      cb();
    }
    return result;
  };

  app.use((req, res, next) => {
    var start = process.hrtime();
    res.on("finish", () => {
      var elapsed = process.hrtime(start)[1] / 1000000;
      let time = elapsed.toFixed(3).replace(".", ",") + " ms";
      console.log(
        `${req.method} ${req.baseUrl + req.path} ${res.statusCode} | ${time}`
      );
    });
    // jsste.render("{}", "");
    next();
  });
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use("/api", internalRouter);

  app.dashboardExist(() => {
    app.use("/dashboard", express.static(__dirname + "/../../dashboard/build"));
    app.get("/dashboard/*", (req, res) => {
      let indexPath = path.join(
        __dirname + "/../../dashboard/build/index.html"
      );
      res.sendFile(indexPath);
    });
    console.log(
      "Dashboard is enabled on http://" +
        websrvConfig.host +
        ":" +
        websrvConfig.port +
        "/dashboard"
    );
  });

  let folders = {
    jsste: "pages",
    css: "styles",
  };

  function getFolderFromFileEnding(filename) {
    let regex_isAnDotfile = /\w+\.[a-z]*[A-Z]*/;
    if (regex_isAnDotfile.test(filename)) {
      let ending = filename.split(".").pop();
      // let ending = path.extname(filename).replace(".", "");
      return "" + folders[ending];
    }
    return "" + folders.jsste;
  }

  function defaultUse(req, res, next) {
    let regex_isAnDotfile = /\w+\.[a-z]*[A-Z]*/;
    let filePath = path.join(
      __dirname.toString(),
      getFolderFromFileEnding(req.url),
      req.url.toString()
    );
    if (regex_isAnDotfile.test(req.url) && !filePath.endsWith(".jsste")) {
      res.sendFile(filePath);
    } else if (fs.existsSync(filePath + ".jsste")) {
      let content = jsste.renderFile(filePath + ".jsste");
      res.send(content);
    } else if (fs.lstatSync(filePath).isDirectory()) {
      let content = jsste.renderFile(
        decode(path.join(filePath, "index.jsste"))
      );
      res.send(content);
    } else next();
  }

  app.get("/*", defaultUse);

  app.slisten = function (cb) {
    app.ServerInstance = server
      .listen(websrvConfig.port, websrvConfig.host, () => {
        State.WebserverState().status = 0;
        State.WebserverState().statusMSG = "webserver is running";
        State.WebserverState().port = websrvConfig.port;
        cb(websrvConfig.host, websrvConfig.port);
      })
      .on("error", (err) => {
        State.WebserverState().status = 1;
        State.WebserverState().statusMSG = "webserver could not started";
        console.error(err);
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
