var fs = require("fs");
var util = require("util");
var moment = require("moment");
let name;
var log_file;
updateData();
var log_stdout = process.stdout;

function updateData() {
  name = "log_" + moment().format("YYYY-MM-DD") + ".log";
  log_file = fs.createWriteStream(__dirname + "/../../logs/" + name, {
    flags: "a",
  });
}

console.log = function (d) {
  name = "log_" + moment().format("YYYY-MM-DD") + ".log";

  d = `[ ${moment().format("YYYY-MM-DD HH:mm:ss")}] ${util.format(d)} \n`;
  log_file.write(d);
  log_stdout.write(d);
};

console.error = (d) => {
  console.log("[ERROR] " + util.format(d));
};

function DeleteOldLogs(olderThan = 30) {
  let files = fs.readdirSync(__dirname + "/../../logs/");
  for (file of files) {
    let date = file.split("_")[1].split(".")[0];
    if (
      moment(date, "YYYY-MM-DD").isBefore(moment().subtract(olderThan, "days"))
    ) {
      fs.unlinkSync(__dirname + "/../../logs/" + file);
      console.log(
        "Deleted " + file + " because it is older than " + olderThan + " days"
      );
    }
  }
}

function getCurrentlog(num = -1) {
  if (num > 0) {
    let log = fs
      .readFileSync(__dirname + "/../../logs/" + name, "utf8")
      .toString()
      .split("\n");
    return log.slice(-num).join("\n");
  } else {
    return fs
      .readFileSync(__dirname + "/../../logs/" + name, "utf8")
      .toString();
  }
}

module.exports = { getCurrentlog, DeleteOldLogs };
