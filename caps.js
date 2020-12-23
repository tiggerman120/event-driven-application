'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const caps = io.of('/caps-namespace');
require('./roles/vendor/vendor');
require('./roles/driver/driver');
require('./events');

const transit = io.of('in-transit-sub');
const delivered = io.of('delivered-sub');

function logger(payload) {
  let timestamp = new Date().toString();
  console.log('EVENT', { timestamp, payload });
}


io.on('connection', (socket) => {
  console.log('you are connected to the server', socket.id);
  socket.on('pickup', payload => {
    
    logger();
    //io.emit('pickup', payload);
  });
});

caps.on('connection', (socket) => {
  console.log('you are connected to caps-namespace', socket.id);
  socket.on('join', room => {
    socket.join(room);
  });


  io.on('pickup', (socket) => {
    console.log('you are connected to the in-transit', socket.id);
    socket.on('in-transit', (payload) => {
      logger('in-transit', payload);
      transit.emit('in-transit', payload);
    });

    delivered.on('connection', (socket) => {
      console.log('you are connected to the transit', socket.id);
      socket.on('delivered', (payload) => {
        logger('delivered', payload);
        delivered.emit('delivered', payload);
      });
    });
  });
});




