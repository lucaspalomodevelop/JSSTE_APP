let conf = require("../helper/conf")();
let { JssteState } = require("../helper/states");
const fs = require("fs");
app = {};
app.instance = {};
app.static = function (constante, cb, instance = app.instance) {};
app.specialvars = function (variable_regex, cb, instance = app.instance) {};

JssteState.status = 2;
JssteState.statusMSG = "JSSTE is only loaded";
JssteState.pageStatus.push({
  page: "this",
  msg: "JSSTE is only loaded",
  status: 2,
});

/**
 *
 * @param {*} pagecode
 * @param {*} templatecode
 */
app.render = function (pagecode, templatecode) {
  JssteState.status = 0;
  if (pagecode == undefined || pagecode == null) {
    console.log("pagecode is undefined or null");
    JssteState.status = 1;
    JssteState.statusMSG = "pagecode is undefined or null";
  }
  if (typeof pagecode == "string") {
    pagecode = JSON.parse(pagecode);
  }

  if (templatecode == undefined || templatecode == null) {
    templatecode = fs.readFileSync(pagecode["_template_"]);
    JssteState.status = 3;
    JssteState.statusMSG = "templatecode is undefined or null";
  }

  templatecode = templatecode.replaceAll("<[VAR]>", "Hallo");

  console.log("render " + JSON.stringify(templatecode));
  return templatecode;
};

module.exports = app;
