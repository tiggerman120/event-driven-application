'use strict';

const events = require('./events');

require('./roles/driver/driver');
require ('./roles/vendor/vendor-handlers');

events.on('pickup', (payload) => {
  let currentDate = new Date().toString();
  let timestamp = currentDate;
  console.log(timestamp, payload);
  

});

events.on('in-transit', (payload) => {
  let currentDate = new Date().toString();
  let timestamp = currentDate;
  console.log(timestamp, `EVENT: in-transit ${payload}`);
});

events.on('delivered', (payload) => {
  let timestamp = new Date().toString();
  console.log(timestamp,`EVENT: delivered ${payload}`);
});