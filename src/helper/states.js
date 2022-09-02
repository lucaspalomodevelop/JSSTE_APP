const { set } = require("express/lib/response");
let { socket, emitIfInit } = require("../helper/socket");

let JssteState = {
  statusMSG: "could not started JSSTE",
  status: 1,
  pageStatus: [],
};
let WebsrvState = { port: undefined, status: undefined };

const io = require("../helper/socket").socket;

function WebserverState() {
  emitIfInit("websrvState", WebsrvState);
  return WebsrvState;
}

function JSSTEState() {
  emitIfInit("jssteState", JssteState);
  return JssteState;
}

module.exports = {
  WebserverState,
  JSSTEState,
};
