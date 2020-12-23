
'use strict';
require('dotenv').config();
console.log('its here');
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3333';
const socket = io.connect(`${host}/caps-namespace`);
socket.emit('join', 'stringx');


setInterval(() => {
  let randomId = Math.ceil(Math.random() * 9000);
  let payload = {
    customerName: faker.name.firstName(),
    customerAddress: faker.address.city(),
    orderId: randomId,
    storeName: process.env.STORENAME,
  };
  console.log('hit the order object', payload);
  socket.emit('pickup', payload);

}, 5000);

socket.on('delivered', (payload) => {
  console.log('thank you');
});
