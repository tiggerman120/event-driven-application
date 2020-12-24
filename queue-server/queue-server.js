'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const io = require('socket.io-client');
const uuid = require('uuid').v4;
const host = 'http://localhost:3333';
const caps = io.connect(`${host}/caps-namespace`);

console.log('queue server module');


const queue = {
  queue: {},
};
caps.on('connection', socket => {
  socket.on('new-order', payload => {
    console.log('new order socket', payload);
    const id = uuid();
    queue.queue[id] = payload;
    socket.emit('added');
    caps.emit('orders', payload);

  });

  socket.on('getAll', () => {
    console.log('in the hub listening to get all');
    Object.keys(queue.queue).forEach(id => {
      socket.emit('orders', { id, payload: queue.queue[id] });
    });
  });

  caps.on('pickup', payload => {
    console.log('in the HUB - heard a new core', payload);
    let events = 'pickup';
    queue.queue[id] = payload;
    caps.emit('received', { events, id, payload }, console.log('queueserver pickup emit'));
  });
  caps.on('received', message => {
    delete queue.queue[message.id];
  });


  caps.on('get-all', payload => {
    console.log(payload, 'get-all route');
    Object.keys(queue.queue).forEach(id => {
      caps.emit('messages', id);
    });
  });

  caps.on('delivered', (payload) => {
    const storage = queue.messageId;
    socket.emit('delivered', storage);

  });

});
