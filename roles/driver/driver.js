'use strict';

require('dotenv').config();
console.log('driver module');
const io = require('socket.io-client');
const host = 'http://localhost:3333';
//const caps = io.connect(host);
const socket = io.connect(`${host}/caps-namespace`);



socket.on('pickup', (payload) => {
  console.log('you are in the handler module');
  setTimeout(() => {
    console.log(`DRIVER: PICKED UP ${payload}`);
    socket.emit('in-transit', payload);
  }, 1000);
  setTimeout(() => {
    console.log('delivered');
    socket.emit('delivered', payload);
  }, 3000);
});

