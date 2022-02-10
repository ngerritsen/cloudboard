const path = require('path');
const fs = require('fs');
const { serverPlay } = require('./events');
const { SERVER_QUEUE } = require('./constants');

let adminToken = null;

try {
  adminToken = fs.readFileSync(path.join(__dirname, '../ADMIN_TOKEN'), 'utf-8');
} catch (e) {
  // Do nothing here
}

function eventHandler(socket) {
  socket.on(SERVER_QUEUE, onQueue);

  function onQueue({ id, board, collection, sound, adminToken: possibleAdminToken }) {
    const { event, data } = serverPlay(id, board, collection, sound);

    if (possibleAdminToken && possibleAdminToken === adminToken) {
      data.admin = true;
    }

    socket.broadcast.emit(event, data);
    socket.emit(event, data);
  }
}

module.exports = eventHandler;
