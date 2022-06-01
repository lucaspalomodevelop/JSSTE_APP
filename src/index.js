let logger = require("./helper/logger");
let conf = require("./helper/conf")();
let websrv = require("./websrv")(conf);
let jobs = require("./helper/cronjobs");
let open = require("open");
let os = require("os");

//os.setPriority(os.constants.priority.PRIORITY_HIGHEST);

/**
 * @description
 * Starts the server
 */
websrv.slisten((host, port) => {
  console.log("Server started on http://" + host + ":" + port);
  open("http://" + host + ":" + port + "/dashboard");
});

/**
 * @description
 * Stops the server
 */
process.on("SIGINT", () => {
  console.log("Web-Server Beenden ...");
  websrv.close();
  logger.DeleteOldLogs();
  console.log("Cronjob Beenden ...");
  jobs.Stop();
  process.exit();
});
