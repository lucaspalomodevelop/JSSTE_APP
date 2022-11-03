let socket = undefined;

function init(server) {
  const { Server } = require("socket.io");
  socket = new Server(server);

  return socket;
}

function emitIfInit(event, ...args) {
  if (socket != undefined) {
    console.log("Emit " + event);
    socket.emit(event, ...args);
  }
}

module.exports = { socket, init, emitIfInit };
