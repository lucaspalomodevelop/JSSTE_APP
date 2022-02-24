let conf = require("./helper/conf")();
// let jsste = require("./jsste")(conf);
let websrv = require("./websrv")(conf);

// console.log("jssteconfig", conf);

websrv.slisten((host, port) => {
  console.log("Server started on http://" + host + ":" + port);
});
