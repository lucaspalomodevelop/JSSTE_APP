let conf = require("../helper/conf")();
let State = require("../helper/states");
const fs = require("fs");
app = {};
app.instance = {};
app.static = function (constante, cb, instance = app.instance) {};
app.specialvars = function (variable_regex, cb, instance = app.instance) {};

State.JSSTEState().status = 2;
State.JSSTEState().statusMSG = "JSSTE is only loaded";
State.JSSTEState().pageStatus.push({
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
  State.JSSTEState().status = 0;
  if (pagecode == undefined || pagecode == null) {
    console.log("pagecode is undefined or null");
    State.JSSTEState().status = 1;
    State.JSSTEState().statusMSG = "pagecode is undefined or null";
  }
  if (typeof pagecode == "string") {
    pagecode = JSON.parse(pagecode);
  }

  if (templatecode == undefined || templatecode == null) {
    templatecode = fs.readFileSync(pagecode["_template_"]);
    State.JSSTEState().status = 3;
    State.JSSTEState().statusMSG = "templatecode is undefined or null";
  }

  templatecode = templatecode.replaceAll("<[VAR]>", "Hallo");

  console.log("render " + JSON.stringify(templatecode));
  return templatecode;
};

module.exports = app;
