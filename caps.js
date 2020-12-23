'use strict';
const uuid = require('uuid').v4;
require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const caps = io.of('/caps-namespace');
console.log(port);
io.on('connection', (socket) => {
  console.log('you are connected to the server', socket.id);
});



caps.on('connection', (socket) => {
  function logger(payload) {
    let timestamp = new Date().toString();
    console.log('EVENT', { timestamp, payload });
  }
  console.log('you are connected to caps-namespace', socket.id);
  socket.on('join', room => {
    console.log(`${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    console.log('line 25');
    logger(payload);
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
});

const queue = {
  chores: {},
};

// family.on('connection', socket => {
//   socket.on('new chore', payload => {
//     console.log('in the HUB - heard a new core', payload);
//     const id = uuid();
//     queue.chores[id] = payload;

//     socket.emit('added');
//     family.emit('chore', {id, payload});
//   });
//});
