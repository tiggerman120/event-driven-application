'use strict';
const socket = require('../../caps.js');
let payload = require('../vendor/vendor');
require('dotenv').config();

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const CAPSConnection = require('../../events');

CAPSConnection.on('pickup', pickUphandler, console.log('you are at the driver module'));

function pickUphandler(payload) {
  console.log('you\'re getting into the handler function', payload);
  setTimeout(() => {
    console.log(`DRIVER: PICKED UP ${payload}`);
    //socket.emit('in-transit', payload);
  }, 1000);
  setTimeout(() => {
    console.log('delivered');
    //socket.emit('delivered', payload);
  }, 3000);
}

