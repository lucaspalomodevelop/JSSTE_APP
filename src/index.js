let conf = require("./helper/conf")();
// let jsste = require("./jsste")(conf);
let websrv = require("./websrv")(conf);

// console.log("jssteconfig", conf);

websrv.slisten(() => {
  console.log(
    "Server started on http://" +
      conf.webserver.host +
      ":" +
      conf.webserver.port
  );
});
