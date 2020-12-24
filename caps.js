'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const caps = io.of('/caps-namespace');

console.log(port);
io.on('connection', (socket) => {
  console.log('you are connected to the server', socket.id);
});

caps.on('connection', (socket) => {
  console.log('you are connected to caps-namespace', socket.id);
  socket.on('join', room => {
    console.log(`${socket.id} joining ${room}`);
    socket.join(room);
  });
});

caps.on('connection', (socket) => {
  function logger(payload) {
    let timestamp = new Date().toString();
    console.log('EVENT', { timestamp, payload });
  }


  socket.on('pickup', (payload) => {
    console.log('line 25');
    logger(payload);
    //let queue.chores[id] = payload
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    console.log('in transit function');
    logger(payload);
    caps.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log('delivered function');
    logger(payload);
    caps.to(payload.store).emit('delivered', payload);
  });

  socket.on('received', (payload) => {
    console.log(payload, 'received route');

  });
});


