let CronJob = require("cron").CronJob;
let jobs = {};
let jobsArray = [];

let logger = require("./logger");

jobs.addJob = function (cron, func) {
  let job = new CronJob(cron, func, null, true, "Europe/Berlin");
  jobsArray.push(job);
  return job;
};

jobs.addJob("0 * * * *", function () {
  logger.DeleteOldLogs();
});

jobs.Start = function () {
  console.log("Starting Cronjobs");
  jobsArray.forEach((job) => {
    job.start();
  });
};

jobs.Stop = function () {
  jobsArray.forEach((job) => {
    job.stop();
  });
};

jobs.Start();

module.exports = jobs;
