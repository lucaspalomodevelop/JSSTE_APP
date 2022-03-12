let logger = require("./helper/logger");
let conf = require("./helper/conf")();
let websrv = require("./websrv")(conf);
let jobs = require("./helper/cronjobs");

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
  logger.DeleteOldLogs();
  console.log("Cronjob Beenden ...");
  jobs.Stop();
  console.log("Web-Server Beenden ...");
  websrv.close();
  process.exit();
});
