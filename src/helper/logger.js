var fs = require("fs");
var util = require("util");
var moment = require("moment");
let name;
var log_file;
updateData();
var log_stdout = process.stdout;

function updateData() {
  name = "log_" + moment().format("YYYY-MM-DD") + ".txt";
  log_file = fs.createWriteStream(__dirname + "/../../logs/" + name, {
    flags: "a",
  });
}
console.log = function (d) {
  name = "log_" + moment().format("YYYY-MM-DD") + ".txt";

  d = `[ ${moment().format("YYYY-MM-DD HH:mm:ss")}] ${util.format(d)} \n`;
  log_file.write(d);
  log_stdout.write(d);
};
console.error = console.log;

function getCurrentlog() {
  return fs.readFileSync(__dirname + "/../../logs/" + name, "utf8").toString();
}

module.exports = { getCurrentlog };
