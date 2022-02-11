const { createServer } = require('http');
const socketIo = require('socket.io');

const eventHandler = require('./event-handler');

const server = createServer(); // eslint-disable-line new-cap
const port = process.env.PORT || 8011;
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:8080', 'https://cloudboard.nielsgerritsen.com'],
    methods: ['GET', 'POST']
  }
});

server.listen(port, err => {
  if (err) {
    throw err;
  }

  io.on('connection', eventHandler);

  console.log(`Cloudboard started, listening on port ${port}.`); // eslint-disable-line no-console
});
