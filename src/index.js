require("./helper/logger");
let conf = require("./helper/conf")();
let websrv = require("./websrv")(conf);

/**
 * @description
 * Starts the server
 */
websrv.slisten((host, port) => {
  console.log("Server started on http://" + host + ":" + port);
});

/**
 * @description
 * Stops the server
 */
process.on("SIGINT", () => {
  console.log("\nWeb-Server Beenden ...");
  websrv.close();
  process.exit();
});
