
'use strict';
require('dotenv').config();
const socket = require('../../caps.js');
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const eventConnection = require('../../events');

eventConnection.on('connection', order(), console.log('you made an order'));

function order() {
  setInterval(() => {
    let randomId = Math.ceil(Math.random() * 9000);
    let payload = {
      customerName: faker.name.firstName(),
      customerAddress: faker.address.city(),
      orderId: randomId,
      storeName: process.env.STORENAME,
    };
    console.log('hit the order object', payload);
    eventConnection.emit('pickup', payload);

    // socket.on('delivered', (payload) => {
    //   console.log('thank you');
    // });
  }, 5000);
}



