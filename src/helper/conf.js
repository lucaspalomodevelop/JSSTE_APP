const { get } = require("express/lib/request");
let fs = require("fs");
let path = require("path");
let process = require("process");

module.exports = function (optPath) {
  let cname = ".jssteconfig";
  let cpath = path.join(__dirname, "..", "..");
  let conf = getCurrentConfig(cpath)
  if (conf.jsste.paths.files) {
    conf.jsste.paths.files = path.join(cpath, conf.jsste.paths.files);
  }
  conf.workingdir = process.cwd();

  return conf;
};

function getCurrentConfig(cpath) {
  let result = "{}";
  let confbundle = [
    {
      name: "cwd",
      path: path.join(process.cwd(), ".jssteconfig"),
      prio: 4,
    },
    {
      name: "cwd_basic",
      path: path.join(process.cwd(), ".jssteconfig_basic"),
      prio: 3,
    },
    {
      name: "cpath",
      path: path.join(cpath, ".jssteconfig"),
      prio: 2,
    },
    {
      name: "cpath_basic",
      path: path.join(cpath, ".jssteconfig_basic"),
      prio: 1,
    },
  ];

  confbundle.sort((a, b) => {
    return b.prio - a.prio;
  });

  for (const [index, el] of confbundle.entries()) {
    if (fs.existsSync(el.path)) {
      console.log(`found ${el.name}`);
      result = fs.readFileSync(el.path);
      break;
    }
  }

  return JSON.parse(result);
}
