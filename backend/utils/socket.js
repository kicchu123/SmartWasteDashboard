let io;
module.exports = {
  init: (server) => { io = require('socket.io')(server, { cors: { origin: process.env.FRONTEND_ORIGIN || '*' } }); return io; },
  get: () => io
};
