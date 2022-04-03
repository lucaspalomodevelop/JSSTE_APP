const { get } = require("express/lib/request");
const res = require("express/lib/response");
let fs = require("fs");
let path = require("path");
let process = require("process");
let instance = null;

/**
 *
 * @param {*} optPath
 * @returns
 */
module.exports = function (optPath) {
  if (instance !== null) {
    return instance;
  }

  let cname = ".jssteconfig";
  let cpath = path.join(__dirname, "..", "..");
  let conf = getCurrentConfig(cpath);
  if (conf.jsste.paths.files) {
    conf.jsste.paths.files = path.join(cpath, conf.jsste.paths.files);
  }
  instance = conf;
  return conf;
};

function getMeta(el) {
  return {
    load: el.name,
    timestemp: new Date().getTime(),
    workingdir: process.cwd(),
    
  };
}

/**
 *
 * @param {*} cpath
 * @returns
 */
function getCurrentConfig(cpath) {
  let result = {};
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
      result = JSON.parse(fs.readFileSync(el.path));
      result.meta = getMeta(el);
      break;
    }
  }

  return result;
}
