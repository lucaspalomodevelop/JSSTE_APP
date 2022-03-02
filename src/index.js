let conf = require("./helper/conf")();
let websrv = require("./websrv")(conf);


websrv.slisten((host, port) => {
  console.log("Server started on http://" + host + ":" + port);
});
