require('dotenv').config();

// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT;
const MESSAGES_LIMIT = 100;
const CONNECTION = 'connection';
const DISCONNECT = 'disconnect';
const NEW_MESSAGE = 'new message';
const USER_COUNT = 'user count';
const messages = [];
let numUsers = 0;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/messages', (req, res) => res.send(messages));

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

io.on(CONNECTION, socket => {
  console.log('connected');
  ++numUsers;
  io.emit(USER_COUNT, { numUsers });
  console.log('user count:', numUsers);

  socket.on(NEW_MESSAGE, message => {
    console.log(`${NEW_MESSAGE}: ${JSON.stringify(message)}`);
    const timestamp = new Date().getTime();

    messages.push({ ...message, timestamp });
    if (messages.length > MESSAGES_LIMIT) messages.shift();

    io.emit(NEW_MESSAGE, { ...message, timestamp });
  });

  socket.on(DISCONNECT, () => {
    console.log('disconnect');
    --numUsers;
    io.emit(USER_COUNT, { numUsers });
    console.log('user count:', numUsers);
  });
});
