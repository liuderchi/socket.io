// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;
const MESSAGES_LIMIT = 100;
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

io.on('connection', socket => {
  console.log('connected');
  ++numUsers;
  io.emit('user count', { numUsers });
  console.log('user count:', numUsers);

  socket.on('new message', message => {
    console.log('new message');
    const timestamp = new Date().getTime();

    messages.push({ ...message, timestamp });
    if (messages.length > MESSAGES_LIMIT) messages.shift();

    io.emit('new message', { ...message, timestamp });
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    --numUsers;
    io.emit('user count', { numUsers });
    console.log('user count:', numUsers);
  });
});
