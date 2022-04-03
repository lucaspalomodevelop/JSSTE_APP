let logger = require("./helper/logger");
let conf = require("./helper/conf")();
const cluster = require("cluster");
let os = require("os");

const totalCPUs = require("os").cpus().length;

os.setPriority(os.constants.priority.PRIORITY_HIGHEST);

if (cluster.isMaster) {
  let jobs = require("./helper/cronjobs");
  let open = require("open");

  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  console.log(
    "Server started on http://" +
      conf.webserver.host +
      ":" +
      conf.webserver.port
  );
  open(
    "http://" + conf.webserver.host + ":" + conf.webserver.port + "/dashboard"
  );

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });

  process.on("SIGINT", async () => {
    console.log("Stopping JSSTE APP Master ...");
    logger.DeleteOldLogs();
    jobs.Stop();
    process.exit();
  });
} else {
  let websrv = require("./websrv")(conf);
  console.log(`Worker ${process.pid} started`);
  websrv.slisten((host, port) => {
    console.log(`Worker ${process.pid} is listening`);
    // console.log("Server started on http://" + host + ":" + port);
    // open("http://" + host + ":" + port + "/dashboard");
  });
  process.on("SIGINT", async () => {
    console.log(`Stopping Worker ${process.pid}...`);
    websrv.close();
    process.exit();
  });
}
