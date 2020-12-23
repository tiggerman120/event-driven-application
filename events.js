'use strict';


// const Events = require('events');

// const events = new Events();
const io = require('socket.io-client');
const host = 'http://localhost:3000';

const CAPSConnection = io.connect(host);

//CAPSConnection.emit('hi', {payload: 'payload'});

module.exports = CAPSConnection;