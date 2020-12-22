'use strict';
require('dotenv').config();
const Events = require('../../events');
//const Order = require('./vendor');
const faker = require('faker');
const events = require('../../events');



module.exports = setInterval(() => {
  let randomId = Math.ceil(Math.random()*9000);
  let newOrder = {
    customerName : faker.name.firstName(),
    customerAddress : faker.address.city(),
    orderId : randomId,
    storeName : process.env.STORENAME,
  };
  events.emit('pickup', newOrder);
  
}, 5000);

events.on('delivered', (payload) => {
  console.log('thank you');
});



