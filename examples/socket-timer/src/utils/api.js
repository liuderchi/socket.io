import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToTimer(interval, cb) {
  // NOTE prepare handler of timer event first
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', interval); // interval is 1 sec
}

export { subscribeToTimer };
