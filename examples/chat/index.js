// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'client/build')));

// Chatroom

var numUsers = 0;

io.on('connection', socket => {
  console.log('connected');
  ++numUsers;
  io.emit('user count', { numUsers });
  console.log('user count:', numUsers);

  socket.on('new message', message => {
    console.log('new message');
    io.emit('new message', {
      ...message,
      timestamp: new Date().getTime(),
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    --numUsers;
    io.emit('user count', { numUsers });
    console.log('user count:', numUsers);
  });
});
